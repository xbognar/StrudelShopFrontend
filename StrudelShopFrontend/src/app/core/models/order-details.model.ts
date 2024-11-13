import { OrderItem } from './order-item.model';

export interface OrderDetails {
  orderId: number;
  orderDate: Date;
  deliveryDate: Date;
  orderTotalAmount: number;
  paymentStatus: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  customerAddress: string;
  orderItems: OrderItem[];
}
