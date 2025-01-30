// src/app/pages/register/register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/models/user.model'; // <--- IMPORTANT
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class RegisterComponent {
  // Use the 'User' type here, with a 'passwordHash' property
  newUser: User = {
    username: '',
    passwordHash: '', // We'll store the typed password here
  };

  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onRegister() {
    this.errorMessage = null;
    // This calls AuthService.register(), sending { username, passwordHash }
    this.authService.register(this.newUser).subscribe(success => {
      if (success) {
        // OK → navigate to login
        this.router.navigate(['/login']);
      } else {
        // error → show message
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
