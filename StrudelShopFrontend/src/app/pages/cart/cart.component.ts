import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  shippingCost = 5.00;
  promoCode = '';
  discount = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  get total(): number {
    return this.subtotal + this.shippingCost - this.discount;
  }

  increment(item: CartItem): void {
    this.cartService.updateQuantity(item.product.productID, item.quantity + 1);
  }

  decrement(item: CartItem): void {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.productID, item.quantity - 1);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.product.productID);
  }

  applyPromo(): void {
    if (this.promoCode === 'DISCOUNT') {
      this.discount = 10;
    } else {
      this.discount = 0;
    }
  }

  checkout(): void {
    alert('Proceeding to checkout...');
  }
}
