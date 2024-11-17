import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { importProvidersFrom, InjectionToken } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { AuthGuard } from './app/core/auth/auth.guard';
import { RoleGuard } from './app/core/auth/role.guard';
import { environment } from './enviroments/environment';

// Define the BASE_URL injection token
export const BASE_URL = new InjectionToken<string>('BASE_URL');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    RoleGuard,
    { provide: BASE_URL, useValue: environment.baseUrl }  // Provide BASE_URL token
  ]
}).catch(err => console.error(err));
