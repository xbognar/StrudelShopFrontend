import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/auth/auth.service';
import { OrderHistory } from '../../core/models/order-history.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderHistory[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.error = 'No user ID found. Please log in.';
      return;
    }
    this.loading = true;
    this.orderService.getOrderHistory(userId).subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load order history.';
        this.loading = false;
      },
    });
  }

  formatDateString(date: Date): string {
    return formatDate(date, 'mediumDate', 'en-US');
  }
}
