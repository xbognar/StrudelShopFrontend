// src/app/core/auth/app.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // 1. Check if user has a valid token
    if (this.authService.hasValidToken()) {
      // 2. Check required role (if any)
      const requiredRole = route.data['role'] as string;
      const hasRole = requiredRole
        ? this.authService.hasRole(requiredRole)
        : true;

      if (hasRole) {
        return true;
      } else {
        // If role mismatch, go to Unauthorized
        return this.router.parseUrl('/unauthorized');
      }
    } else {
      // If no valid token, force logout and go to login with returnUrl
      this.authService.logout();
      return this.router.parseUrl('/login?returnUrl=' + state.url);
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
