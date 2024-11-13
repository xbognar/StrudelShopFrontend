import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
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
  categories: string[] = ['Najpopulárnejšie', 'Všetky', 'Náš typ', 'Novinky'];
  activeCategory: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  setActiveCategory(index: number): void {
    this.activeCategory = index;
  }
}
