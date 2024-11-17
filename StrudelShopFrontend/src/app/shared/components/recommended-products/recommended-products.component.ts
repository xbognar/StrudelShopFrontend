import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-recommended-products',
  templateUrl: './recommended-products.component.html',
  styleUrls: ['./recommended-products.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RecommendedProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  // The ID of the currently viewed product to exclude it from recommendations
  @Input() currentProductId!: number;

  recommendedProducts: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadRecommendedProducts();
  }

  ngAfterViewInit(): void { }

  // Load all products and select three random ones, excluding the current product
  loadRecommendedProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        // Filter out the current product (if necessary)
        const filteredProducts = products.filter(
          product => product.productID !== this.currentProductId
        );

        // Shuffle and pick the first three products
        this.recommendedProducts = this.getRandomProducts(filteredProducts, 3);
      },
      error: () => console.error('Failed to load recommended products'),
    });
  }

  // Helper function to select n random products
  private getRandomProducts(products: Product[], n: number): Product[] {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  // Scroll functions for carousel
  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
