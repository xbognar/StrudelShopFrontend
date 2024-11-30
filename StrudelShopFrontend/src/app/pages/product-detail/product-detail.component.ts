import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderStandardComponent } from '../../components/header-standard/header-standard.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RecommendedProductsComponent } from '../../components/recommended-products/recommended-products.component';
import { ProductService } from '../../../app/core/services/product.service';
import { Product } from '../../../app/core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HeaderStandardComponent,
    FooterComponent,
    RecommendedProductsComponent,
  ],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity: number = 1;
  currentImageIndex: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id'];
    this.loadProduct(productId);
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.currentImageIndex = 0;
      },
      error: () => console.error('Failed to load product'),
    });
  }

  get displayedImages() {
    if (!this.product?.productImages) {
      return [];
    }
    // Exclude the current main image
    return this.product.productImages.filter((_, index) => index !== this.currentImageIndex);
  }

  get currentImageUrl(): string | undefined {
    return this.product?.productImages?.[this.currentImageIndex]?.imageURL;
  }

  previousImage(): void {
    if (this.product?.productImages) {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.product.productImages.length - 1;
      }
    }
  }

  nextImage(): void {
    if (this.product?.productImages) {
      if (this.currentImageIndex < this.product.productImages.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    }
  }

  showImage(image: { imageURL: string }) {
    const index = this.product?.productImages?.findIndex((img) => img.imageURL === image.imageURL);
    if (index !== undefined && index >= 0) {
      this.currentImageIndex = index;
    }
  }

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
