import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { CatalogItemComponent } from '../catalog-item/catalog-item.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  standalone: true,
  imports: [CommonModule, CatalogItemComponent]
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.fetchProducts().subscribe({
      next: (data) => {
        this.products = data.map(product => ({
          ...product,
          imageUrl: product.imageUrl.replace('C:\\\\Users\\\\matth\\\\JobPractice\\\\StrudelShopFrontend\\\\StrudelShopFrontend\\\\src\\\\assets\\\\images\\\\', '/assets/images/')
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
      },
    });
  }
}
