import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { importProvidersFrom, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './enviroments/environment';
import { AuthService } from './app/core/auth/auth.service';
import { AppGuard } from './app/core/auth/app.guard';
import { BaseService } from './app/core/services/base.service';

export const BASE_URL = new InjectionToken<string>('BASE_URL');

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    AppGuard,
    AuthService,
    BaseService,
    { provide: BASE_URL, useValue: environment.baseUrl }
  ]
}).catch(err => console.error(err));
