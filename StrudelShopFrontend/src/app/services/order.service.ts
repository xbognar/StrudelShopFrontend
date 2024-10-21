import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  fetchOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  createOrder(order: Order): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/orders`, order, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateOrder(id: number, order: Order): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/orders/${id}`, order, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }
}
