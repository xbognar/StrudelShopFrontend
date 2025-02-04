import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HeaderStandardComponent } from '../../components/header-standard/header-standard.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RecommendedProductsComponent } from '../../components/recommended-products/recommended-products.component';
import { ProductService } from '../../../app/core/services/product.service';
import { Product } from '../../../app/core/models/product.model';
import { CartService } from '../../../app/core/services/cart.service';
import { AuthService } from '../../../app/core/auth/auth.service';
import { Router } from '@angular/router';

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
export class ProductDetailComponent implements OnInit, AfterViewInit {
  product: Product | undefined;
  quantity = 1;
  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private viewportScroller: ViewportScroller,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      const productId = +params['id'];
      this.loadProduct(productId);
    });
  }

  ngAfterViewInit(): void {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.viewportScroller.scrollToAnchor(fragment);
    }
  }

  addToCart(): void {
    
    if (!this.authService.hasValidToken()) {

      const currentUrl = this.router.url;
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: currentUrl },
      });
      return;
    }

    if (this.product) {
      this.cartService.addItem(this.product, this.quantity);
    }
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
    return this.product.productImages.filter(
      (_, index) => index !== this.currentImageIndex
    );
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
    if (!this.product?.productImages) return;
    const index = this.product.productImages.findIndex(
      (img) => img.imageURL === image.imageURL
    );
    if (index >= 0) {
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
