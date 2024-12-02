import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AuthRequest } from '../../core/models/auth-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class RegisterComponent {
  newUser: AuthRequest = { username: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    this.authService.register(this.newUser).subscribe((success) => {
      if (success) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
