import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-product',
  imports: [],
  template: `<p>NewProduct works!</p>`,
  styleUrl: './NewProduct.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProduct {}
