import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HeaderHomeComponent {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe((logged) => {
      this.isLoggedIn = logged;
      this.isAdmin = this.authService.hasRole('Admin');
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
