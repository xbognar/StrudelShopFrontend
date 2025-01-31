import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  error: string | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {  
   this.orderService.getAllOrders().subscribe({  
     next: (data) => {  
       this.orders = data.map(order => ({  
         ...order,  
         orderDate: order.orderDate ? new Date(order.orderDate) : new Date(),
         deliveryDate: order.deliveryDate ? new Date(order.deliveryDate) : new Date(),
         totalAmount: order.totalAmount ?? 0,
       }));  
     },  
     error: (err) => {  
       this.error = 'Nepodarilo sa načítať objednávky';  
       console.error(err);  
     }  
   });  
  }
}
