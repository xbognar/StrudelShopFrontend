export interface OrderHistory {
  orderId: number;
  orderDate: Date;
  deliveryDate: Date;
  totalAmount: number;
  paymentStatus: string;
}
