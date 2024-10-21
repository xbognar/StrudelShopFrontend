import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(protected override http: HttpClient) {
    super(http);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  startTokenRefresh(): void {
    setInterval(() => {
      this.login('defaultUsername', 'defaultPassword').subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          console.log('Token refreshed');
        },
        error: (err) => console.error('Failed to refresh token', err)
      });
    }, 115 * 60 * 1000); // Refresh every 1 hour and 55 minutes
  }
}
