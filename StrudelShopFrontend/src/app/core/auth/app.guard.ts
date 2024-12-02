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
    if (this.authService.hasValidToken()) {
      const requiredRole = route.data['role'] as string;
      const hasRole = requiredRole ? this.authService.hasRole(requiredRole) : true;

      if (hasRole) {
        return true;
      } else {
        return this.router.parseUrl('/unauthorized');
      }
    } else {
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
