import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() { }

  addItem(product: Product, quantity: number): void {
    const currentItems = this.itemsSubject.value.slice();
    const existingIndex = currentItems.findIndex(i => i.product.productID === product.productID);

    if (existingIndex >= 0) {
      // If product already in cart, just update quantity
      currentItems[existingIndex].quantity += quantity;
    } else {
      // Else push new item
      currentItems.push({ product, quantity });
    }
    this.itemsSubject.next(currentItems);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    const currentItems = this.itemsSubject.value.slice();
    const idx = currentItems.findIndex(i => i.product.productID === productId);
    if (idx >= 0) {
      currentItems[idx].quantity = newQuantity;
      if (currentItems[idx].quantity < 1) {
        currentItems.splice(idx, 1);
      }
      this.itemsSubject.next(currentItems);
    }
  }

  removeItem(productId: number): void {
    const currentItems = this.itemsSubject.value.slice();
    const idx = currentItems.findIndex(i => i.product.productID === productId);
    if (idx >= 0) {
      currentItems.splice(idx, 1);
      this.itemsSubject.next(currentItems);
    }
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }

  getItemsSnapshot(): CartItem[] {
    return this.itemsSubject.value;
  }
}
