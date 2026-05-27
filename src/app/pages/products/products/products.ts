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
  private readonly storageKey = 'products:v1';

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
      if (typeof productForm.reset === 'function') productForm.reset();
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    globalThis.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });

    productForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const code = (document.getElementById('productCode') as HTMLInputElement | null)?.value.trim() || '';
      const name = (document.getElementById('productName') as HTMLInputElement | null)?.value.trim() || '';
      const category = (document.getElementById('productCategory') as HTMLInputElement | null)?.value.trim() || '';
      const price = Number.parseFloat((document.getElementById('productPrice') as HTMLInputElement | null)?.value || '0');
      const stock = Number.parseInt((document.getElementById('productStock') as HTMLInputElement | null)?.value || '0');

      if (!code || !name) {
        alert('El código y nombre son obligatorios.');
        return;
      }

      const product: Product = { code, name, category, price: Number.isNaN(price) ? 0 : price, stock: Number.isNaN(stock) ? 0 : stock };
      this.addRow(product);
      this.saveToStorage(product);
      closeModal();
    });

    // Detail modal handlers
    const detailModal = document.getElementById('productDetailModal');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const closeDetailBtn2 = document.getElementById('closeDetailBtn2');
    if (closeDetailBtn) closeDetailBtn.addEventListener('click', () => { if (detailModal) detailModal.style.display = 'none'; });
    if (closeDetailBtn2) closeDetailBtn2.addEventListener('click', () => { if (detailModal) detailModal.style.display = 'none'; });
    globalThis.addEventListener('click', (event) => {
      if (event.target === detailModal) { if (detailModal) detailModal.style.display = 'none'; }
    });

    // Delegated click handler so static rows also open detail
    const tableBody = document.querySelector('table tbody');
    if (tableBody) {
      tableBody.addEventListener('click', (ev) => {
        const tr = (ev.target as HTMLElement).closest('tr');
        if (!tr) return;
        const cells = tr.querySelectorAll('td');
        if (cells.length >= 5) {
          const product: Product = {
            code: (cells[0].textContent || '').trim(),
            name: (cells[1].textContent || '').trim(),
            category: (cells[2].textContent || '').trim(),
            price: Number.parseFloat((cells[3].textContent || '').replace(/[^0-9.-]+/g, '')) || 0,
            stock: Number.parseInt((cells[4].textContent || '').replace(/[^0-9-]+/g, '')) || 0
          };
          this.showDetail(product);
        }
      });
    }
  }

  private addRow(product: Product) {
    const tableBody = document.querySelector('table tbody');
    if (!tableBody) return;

    const newRow = document.createElement('tr');

    const tdCode = document.createElement('td'); tdCode.textContent = product.code;
    const tdName = document.createElement('td'); tdName.textContent = product.name;
    const tdCategory = document.createElement('td'); tdCategory.textContent = product.category || '-';
    const tdPrice = document.createElement('td'); tdPrice.className = 'numero'; tdPrice.textContent = '$' + (Number.isNaN(product.price) ? '0.00' : product.price.toFixed(2));
    const tdStock = document.createElement('td'); tdStock.className = 'numero'; tdStock.textContent = (Number.isNaN(product.stock) ? 0 : product.stock) + ' u.';
    if ((Number.isNaN(product.stock) ? 0 : product.stock) <= 0) tdStock.classList.add('sin-stock');

    newRow.appendChild(tdCode);
    newRow.appendChild(tdName);
    newRow.appendChild(tdCategory);
    newRow.appendChild(tdPrice);
    newRow.appendChild(tdStock);

    // make row clickable to view details
    newRow.dataset['code'] = product.code;
    newRow.style.cursor = 'pointer';
    newRow.addEventListener('click', () => this.showDetail(product));

    tableBody.appendChild(newRow);
  }

  private showDetail(product: Product) {
    const detailModal = document.getElementById('productDetailModal');
    if (!detailModal) return;
    const setText = (id: string, value: string) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    setText('detailCode', product.code);
    setText('detailName', product.name);
    setText('detailCategory', product.category || '-');
    setText('detailPrice', '$' + (Number.isNaN(product.price) ? '0.00' : product.price.toFixed(2)));
    setText('detailStock', (Number.isNaN(product.stock) ? 0 : product.stock) + ' u.');
    detailModal.style.display = 'block';
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
      console.warn('Error leyendo productos desde localStorage', e);
      return [];
    }
  }

  private loadFromStorage() {
    const items = this.readStorage();
    items.forEach(it => this.addRow(it));
  }
}
