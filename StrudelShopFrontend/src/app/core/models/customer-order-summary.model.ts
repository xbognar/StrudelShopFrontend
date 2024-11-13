export interface CustomerOrderSummary {
  orderId: number;
  orderDate: Date;
  totalAmount: number;
  customerName: string;
  paymentStatus: string;
}
