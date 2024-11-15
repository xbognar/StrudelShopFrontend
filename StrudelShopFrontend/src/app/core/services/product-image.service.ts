import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ProductImage } from '../models/product-image.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  constructor(private baseService: BaseService) { }

  getAllProductImages(): Observable<ProductImage[]> {
    return this.baseService.get<ProductImage[]>('/Productimage');
  }

  getProductImageById(id: number): Observable<ProductImage> {
    return this.baseService.get<ProductImage>(`/Productimage/${id}`);
  }

  createProductImage(productImage: ProductImage): Observable<ProductImage> {
    return this.baseService.post<ProductImage>('/Productimage', productImage);
  }

  updateProductImage(id: number, productImage: ProductImage): Observable<ProductImage> {
    return this.baseService.put<ProductImage>(`/Productimage/${id}`, productImage);
  }

  deleteProductImage(id: number): Observable<void> {
    return this.baseService.delete<void>(`/Productimage/${id}`);
  }
}
