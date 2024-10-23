import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { LoginResponse } from '../models/login-response.model';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  login(): Observable<LoginResponse> {
    const body = {
      username: environment.username,
      password: environment.password
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  startTokenRefresh(): void {
    setInterval(() => {
      this.login().subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          console.log('Token refreshed');
        },
        error: (err) => console.error('Failed to refresh token', err)
      });
    }, 115 * 60 * 1000);
  }
}
