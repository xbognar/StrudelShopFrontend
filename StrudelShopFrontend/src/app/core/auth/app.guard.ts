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

  /**
   * Determines if a route can be activated based on authentication and role.
   * - If the user has a valid token, checks for role permissions.
   * - Redirects to unauthorized page if role mismatch.
   * - Redirects to login page if no valid token is found.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.hasValidToken()) {
      const requiredRole = route.data['role'] as string;
      const hasRole = requiredRole ? this.authService.hasRole(requiredRole) : true;

      return hasRole ? true : this.router.parseUrl('/unauthorized');
    } else {
      this.authService.logout();
      return this.router.parseUrl('/login?returnUrl=' + state.url);
    }
  }

  /**
   * Ensures child routes also require authentication.
   * Calls `canActivate` logic.
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
