
export interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  paymentStatus: string;
}
