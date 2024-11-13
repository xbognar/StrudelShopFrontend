// product.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Product } from '../models/product.model';
import { ProductOverview } from '../models/product-overview.model';
import { TopProduct } from '../models/top-product.model';
import { TopSellingProduct } from '../models/top-selling-product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private baseService: BaseService) { }

  getAllProducts(): Observable<Product[]> {
    return this.baseService.get<Product[]>('/products');
  }

  getProductById(id: number): Observable<Product> {
    return this.baseService.get<Product>(`/products/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.baseService.post<Product>('/products', product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.baseService.put<Product>(`/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.baseService.delete<void>(`/products/${id}`);
  }

  getTopSellingProducts(): Observable<TopSellingProduct[]> {
    return this.baseService.get<TopSellingProduct[]>('/products/top-selling');
  }

  getProductOverview(): Observable<ProductOverview[]> {
    return this.baseService.get<ProductOverview[]>('/products/overview');
  }
}
