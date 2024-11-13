import { Order } from './order.model';
import { Product } from './product.model';

export interface OrderItem {
  orderItemID: number;
  orderID: number;
  productID: number;
  quantity: number;
  price: number;
  order?: Order; // Optional, to represent the related order
  product?: Product; // Optional, to represent the related product
}
