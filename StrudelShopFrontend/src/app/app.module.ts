import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Guards and Interceptor
import { AuthGuard } from './core/auth/auth.guard';
import { RoleGuard } from './core/auth/role.guard';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Standalone Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Environment for Base URL
import { environment } from '../enviroments/environment';

// Injection token for base URL
export const BASE_URL = new InjectionToken<string>('BASE_URL');

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, // Ensure routing is set up correctly
    AppComponent      // Import AppComponent as a standalone component
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: BASE_URL, useValue: environment.baseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
