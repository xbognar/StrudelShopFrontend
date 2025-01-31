// src/app/core/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { AuthRequest } from '../models/auth-request.model';
import { AuthResponse } from '../models/auth-response.model';
import { RegisterRequest } from '../models/register-request.model';
import { environment } from '../../../enviroments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private roleKey = 'role';
  private userIdKey = 'userId';

  private loggedIn = new BehaviorSubject<boolean>(this.hasValidToken());
  private userRole = new BehaviorSubject<string | null>(this.getUserRole());

  constructor(private http: HttpClient) { }

  login(credentials: AuthRequest): Observable<boolean> {
    // Calls /api/authentication/login -> expects JSON {token, ...}
    return this.http.post<AuthResponse>(`${environment.baseUrl}/authentication/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        this.setSession(response);
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  register(newUser: RegisterRequest): Observable<boolean> {
    // 1) Send { username, password } to /register -> returns plain text
    return this.http
      .post(`${environment.baseUrl}/authentication/register`, newUser, {
        responseType: 'text' as 'json', // returns "Registration successful"
      })
      .pipe(
        switchMap(() => {
          // 2) If register succeeded, auto-login with same credentials
          return this.login({ username: newUser.username, password: newUser.password });
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    this.clearSession();
    this.loggedIn.next(false);
    this.userRole.next(null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null;
  }

  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem(this.tokenKey, authResponse.token);
    localStorage.setItem(this.roleKey, authResponse.role);
    localStorage.setItem(this.userIdKey, authResponse.userId.toString());
    this.loggedIn.next(true);
    this.userRole.next(authResponse.role);
  }

  private clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userIdKey);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwt_decode(token);
      if (!decoded.exp) return false;
      const expiry = new Date(0);
      expiry.setUTCSeconds(decoded.exp);
      return expiry < new Date();
    } catch {
      return true;
    }
  }
}
