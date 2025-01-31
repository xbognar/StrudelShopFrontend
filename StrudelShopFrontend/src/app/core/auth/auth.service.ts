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
  private tokenKey = 'token'; // Local storage key for JWT token
  private roleKey = 'role'; // Local storage key for user role
  private userIdKey = 'userId'; // Local storage key for user ID

  // Observable state for login status and user role
  private loggedIn = new BehaviorSubject<boolean>(this.hasValidToken());
  private userRole = new BehaviorSubject<string | null>(this.getUserRole());

  constructor(private http: HttpClient) { }

  /**
   * Logs in a user by sending credentials to the backend.
   * Stores the received JWT token and user details.
   */
  login(credentials: AuthRequest): Observable<boolean> {
    return this.http.post<AuthResponse>(`${environment.baseUrl}/authentication/login`, credentials).pipe(
      tap((response: AuthResponse) => this.setSession(response)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  /**
   * Registers a new user and automatically logs them in upon success.
   */
  register(newUser: RegisterRequest): Observable<boolean> {
    return this.http
      .post(`${environment.baseUrl}/authentication/register`, newUser, {
        responseType: 'text' as 'json',
      })
      .pipe(
        switchMap(() => this.login({ username: newUser.username, password: newUser.password })),
        catchError(() => of(false))
      );
  }

  /**
   * Logs out the user by clearing local storage and updating state.
   */
  logout(): void {
    this.clearSession();
    this.loggedIn.next(false);
    this.userRole.next(null);
  }

  /**
   * Checks if the user is currently logged in.
   */
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  /**
   * Verifies if a valid token is present in local storage.
   */
  hasValidToken(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  /**
   * Retrieves the stored JWT token.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Retrieves the user's role from local storage.
   */
  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  /**
   * Checks if the user has a specific role.
   */
  hasRole(role: string): boolean {
    return this.getUserRole() === role;
  }

  /**
   * Retrieves the stored user ID.
   */
  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null;
  }

  /**
   * Stores authentication details (token, role, userId) in local storage.
   * Updates the logged-in and role state observables.
   */
  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem(this.tokenKey, authResponse.token);
    localStorage.setItem(this.roleKey, authResponse.role);
    localStorage.setItem(this.userIdKey, authResponse.userId.toString());
    this.loggedIn.next(true);
    this.userRole.next(authResponse.role);
  }

  /**
   * Clears authentication details from local storage.
   */
  private clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userIdKey);
  }

  /**
   * Decodes and verifies if the JWT token is expired.
   */
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
