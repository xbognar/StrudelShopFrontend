import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { RecommendedProductsComponent } from './components/recommended-products/recommended-products.component';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.baseUrl }
  ],
  declarations: [
    RecommendedProductsComponent
  ]
})
export class AppModule { }
