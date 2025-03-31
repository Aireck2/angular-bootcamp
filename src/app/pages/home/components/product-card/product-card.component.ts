import { PercentPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { Product } from '../../../../services/products.service';
import { AddCartDialogComponent } from '../add-cart-dialog/add-cart-dialog.component';

@Component({
  selector: 'app-product-card',
  imports: [HlmCardDirective, PercentPipe, AddCartDialogComponent],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  public item = input.required<Product>();
}
