import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard } from './core/auth/auth.guard';
import { RoleGuard } from './core/auth/role.guard';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { environment } from '../enviroments/environment';
import { RecommendedProductsComponent } from './shared/components/recommended-products/recommended-products.component';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: BASE_URL, useValue: environment.baseUrl }
  ],
  declarations: [
    RecommendedProductsComponent
  ]
})
export class AppModule { }
