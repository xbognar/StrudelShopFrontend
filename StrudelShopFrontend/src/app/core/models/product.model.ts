import { ProductImage } from './product-image.model';

export interface Product {
  productID: number;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  productImages?: ProductImage[]; // Optional, to represent additional images of the product
}