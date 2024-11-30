import { Product } from './product.model';

export interface ProductImage {
  imageID: number;
  productID: number;
  imageURL: string;
  product?: Product;
}
