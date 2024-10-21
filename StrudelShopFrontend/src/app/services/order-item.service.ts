import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { OrderItem } from '../models/order-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);  
  }

  fetchOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiUrl}/orderitems`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getOrderItemById(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.apiUrl}/orderitems/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  createOrderItem(orderItem: OrderItem): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/orderitems`, orderItem, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateOrderItem(id: number, orderItem: OrderItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/orderitems/${id}`, orderItem, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteOrderItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orderitems/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }
}
