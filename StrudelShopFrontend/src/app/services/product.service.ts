import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);  // Call the BaseService constructor
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/products`, product, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/products/${id}`, product, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }
}
