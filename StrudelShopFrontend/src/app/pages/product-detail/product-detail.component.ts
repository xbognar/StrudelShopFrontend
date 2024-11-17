import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../app/core/services/product.service';
import { Product } from '../../../app/core/models/product.model';
import { CommonModule } from '@angular/common'; // Import CommonModule for pipes like currency
import { HeaderStandardComponent } from '../../shared/components/header-standard/header-standard.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RecommendedProductsComponent } from '../../shared/components/recommended-products/recommended-products.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  standalone: true,
  imports: [
    CommonModule, // Import CommonModule to access currency pipe
    HeaderStandardComponent, // Import header component
    FooterComponent, // Import footer component
    RecommendedProductsComponent, // Import recommended products component
  ],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity: number = 1;
  currentImageIndex: number = 0; // Track the currently displayed image index

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.loadProduct(productId);
  }

  loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
      },
      error: () => console.error('Failed to load product'),
    });
  }

  get displayedImages() {
    // Display only 3 images starting from currentImageIndex
    return this.product?.productImages?.slice(this.currentImageIndex, this.currentImageIndex + 3) || [];
  }

  get currentImageUrl(): string | undefined {
    // Return the URL of the currently selected image
    return this.product?.productImages?.[this.currentImageIndex]?.imageURL;
  }

  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  nextImage(): void {
    if (this.product?.productImages && this.currentImageIndex < this.product.productImages.length - 3) {
      this.currentImageIndex++;
    }
  }

  showImage(image: { imageURL: string }) {
    const index = this.product?.productImages?.findIndex(img => img.imageURL === image.imageURL);
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
