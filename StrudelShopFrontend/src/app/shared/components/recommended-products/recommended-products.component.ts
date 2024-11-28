import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class RecommendedProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  @Input() currentProductId!: number;

  recommendedProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadRecommendedProducts();
  }

  ngAfterViewInit(): void { }

  loadRecommendedProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        const filteredProducts = products.filter(
          product => product.productID !== this.currentProductId
        );

        // Shuffle and get up to 5 products
        this.recommendedProducts = this.getRandomProducts(filteredProducts, 5);
      },
      error: () => console.error('Failed to load recommended products'),
    });
  }

  private getRandomProducts(products: Product[], n: number): Product[] {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  scrollLeft(): void {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
}
