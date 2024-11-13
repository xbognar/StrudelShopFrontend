import { OrderItem } from './order-item.model';
import { User } from './user.model';

export interface Order {
  orderID: number;
  userID: number;
  orderDate: Date;
  deliveryDate: Date;
  totalAmount: number;
  paymentStatus: string;
  user?: User;
  orderItems?: OrderItem[];
}
