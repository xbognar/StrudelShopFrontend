// order.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Order } from '../models/order.model';
import { OrderHistory } from '../models/order-history.model';
import { OrderDetails } from '../models/order-details.model';
import { CustomerOrderSummary } from '../models/customer-order-summary.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private baseService: BaseService) { }

  getAllOrders(): Observable<Order[]> {
    return this.baseService.get<Order[]>('/orders');
  }

  getOrderById(id: number): Observable<Order> {
    return this.baseService.get<Order>(`/orders/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.baseService.post<Order>('/orders', order);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.baseService.put<Order>(`/orders/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.baseService.delete<void>(`/orders/${id}`);
  }

  getOrderHistory(userId: number): Observable<OrderHistory[]> {
    return this.baseService.get<OrderHistory[]>(`/orders/history/${userId}`);
  }

  getOrderDetails(id: number): Observable<OrderDetails> {
    return this.baseService.get<OrderDetails>(`/orders/details/${id}`);
  }

  getOrderSummary(): Observable<CustomerOrderSummary[]> {
    return this.baseService.get<CustomerOrderSummary[]>('/orders/summary');
  }
}
