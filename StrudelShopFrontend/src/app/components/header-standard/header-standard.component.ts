import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-standard',
  templateUrl: './header-standard.component.html',
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class HeaderStandardComponent {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
      this.isAdmin = this.authService.hasRole('Admin');
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
