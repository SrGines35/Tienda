import { ChangeDetectionStrategy, Component, AfterViewInit } from '@angular/core';

interface Product {
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Products implements AfterViewInit {
  private storageKey = 'products:v1';

  ngAfterViewInit(): void {
    try {
      this.attachModalLogic();
      this.loadFromStorage();
    } catch (e) {
      console.warn('Error inicializando Products component modal logic', e);
    }
  }

  private attachModalLogic() {
    const modal = document.getElementById('productModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const productForm = document.getElementById('productForm') as HTMLFormElement | null;
    const tableBody = document.querySelector('table tbody');

    if (!modal || !openModalBtn || !productForm) {
      console.warn('Elementos del modal no encontrados. Asegúrate de que la vista esté cargada desde el servidor dev.');
      return;
    }

    openModalBtn.addEventListener('click', () => {
      modal.style.display = 'block';
      const codeEl = document.getElementById('productCode') as HTMLInputElement | null;
      if (codeEl) codeEl.focus();
    });

    const closeModal = () => {
      modal.style.display = 'none';
      try { productForm.reset(); } catch (e) { /* ignore */ }
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });

    productForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const code = (document.getElementById('productCode') as HTMLInputElement | null)?.value.trim() || '';
      const name = (document.getElementById('productName') as HTMLInputElement | null)?.value.trim() || '';
      const category = (document.getElementById('productCategory') as HTMLInputElement | null)?.value.trim() || '';
      const price = parseFloat((document.getElementById('productPrice') as HTMLInputElement | null)?.value || '0');
      const stock = parseInt((document.getElementById('productStock') as HTMLInputElement | null)?.value || '0');

      if (!code || !name) {
        alert('El código y nombre son obligatorios.');
        return;
      }

      const product: Product = { code, name, category, price: isNaN(price) ? 0 : price, stock: isNaN(stock) ? 0 : stock };
      this.addRow(product);
      this.saveToStorage(product);
      closeModal();
    });

    // render existing storage items
    if (tableBody) {
      const items = this.readStorage();
      items.forEach(it => this.addRow(it));
    }
  }

  private addRow(product: Product) {
    const tableBody = document.querySelector('table tbody');
    if (!tableBody) return;

    const newRow = document.createElement('tr');

    const tdCode = document.createElement('td'); tdCode.textContent = product.code;
    const tdName = document.createElement('td'); tdName.textContent = product.name;
    const tdCategory = document.createElement('td'); tdCategory.textContent = product.category || '-';
    const tdPrice = document.createElement('td'); tdPrice.className = 'numero'; tdPrice.textContent = '$' + (isNaN(product.price) ? '0.00' : product.price.toFixed(2));
    const tdStock = document.createElement('td'); tdStock.className = 'numero'; tdStock.textContent = (isNaN(product.stock) ? 0 : product.stock) + ' u.';
    if ((isNaN(product.stock) ? 0 : product.stock) <= 0) tdStock.classList.add('sin-stock');

    newRow.appendChild(tdCode);
    newRow.appendChild(tdName);
    newRow.appendChild(tdCategory);
    newRow.appendChild(tdPrice);
    newRow.appendChild(tdStock);

    tableBody.appendChild(newRow);
  }

  private saveToStorage(item: Product) {
    const arr = this.readStorage();
    arr.push(item);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(arr));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage', e);
    }
  }

  private readStorage(): Product[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      return JSON.parse(raw) as Product[];
    } catch (e) {
      return [];
    }
  }

  private loadFromStorage() {
    const items = this.readStorage();
    items.forEach(it => this.addRow(it));
  }
}
