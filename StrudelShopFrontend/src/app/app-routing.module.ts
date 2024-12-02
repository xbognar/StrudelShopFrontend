import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { OrdersComponent } from './pages/admin/orders/orders.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ContactAboutComponent } from './pages/contact-about/contact-about.component';

import { AppGuard } from './core/auth/app.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact-about', component: ContactAboutComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AppGuard],
    data: { role: 'User' },
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AppGuard],
    data: { role: 'User' },
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    canActivate: [AppGuard],
    data: { role: 'User' },
  },
  {
    path: 'admin',
    canActivateChild: [AppGuard],
    data: { role: 'Admin' },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
