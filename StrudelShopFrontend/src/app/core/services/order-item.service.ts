// order-item.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { OrderItem } from '../models/order-item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  constructor(private baseService: BaseService) { }

  getAllOrderItems(): Observable<OrderItem[]> {
    return this.baseService.get<OrderItem[]>('/orderitems');
  }

  getOrderItemById(id: number): Observable<OrderItem> {
    return this.baseService.get<OrderItem>(`/orderitems/${id}`);
  }

  createOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    return this.baseService.post<OrderItem>('/orderitems', orderItem);
  }

  updateOrderItem(id: number, orderItem: OrderItem): Observable<OrderItem> {
    return this.baseService.put<OrderItem>(`/orderitems/${id}`, orderItem);
  }

  deleteOrderItem(id: number): Observable<void> {
    return this.baseService.delete<void>(`/orderitems/${id}`);
  }
}
