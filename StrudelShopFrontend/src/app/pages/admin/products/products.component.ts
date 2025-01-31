import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data.map(product => ({
          ...product,
          price: product.price ?? 0,
        }));
      },
      error: (err) => {
        this.error = 'Nepodarilo sa načítať produkty';
        console.error(err);
      }
    });
  }
}
