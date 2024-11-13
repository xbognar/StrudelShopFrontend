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
import { AuthGuard } from './core/auth/auth.guard';
import { RoleGuard } from './core/auth/role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuard] },
  { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { role: 'Admin' } },
      { path: 'products', component: ProductsComponent, canActivate: [RoleGuard], data: { role: 'Admin' } },
      { path: 'orders', component: OrdersComponent, canActivate: [RoleGuard], data: { role: 'Admin' } },
      { path: 'users', component: UsersComponent, canActivate: [RoleGuard], data: { role: 'Admin' } },
    ]
  },
  { path: '**', redirectTo: '' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
