import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  totalOrders = 0;
  totalProducts = 0;
  totalUsers = 0;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    
    this.orderService.getAllOrders().subscribe({
      next: orders => {
        this.totalOrders = orders.length;
      },
      error: err => console.error('Nepodarilo sa načítať objednávky', err)
    });

    this.productService.getAllProducts().subscribe({
      next: products => {
        this.totalProducts = products.length;
      },
      error: err => console.error('Nepodarilo sa načítať produkty', err)
    });

    this.userService.getAllUsers().subscribe({
      next: users => {
        this.totalUsers = users.length;
      },
      error: err => console.error('Nepodarilo sa načítať používateľov', err)
    });
  }
}
