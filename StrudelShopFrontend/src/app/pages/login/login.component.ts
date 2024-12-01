import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderStandardComponent } from '../../components/header-standard/header-standard.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../core/auth/auth.service';
import { AuthRequest } from '../../core/models/auth-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, HeaderStandardComponent, FooterComponent],
})
export class LoginComponent {
  credentials: AuthRequest = { username: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        console.log('Login successful');
      },
      error: () => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      },
    });
  }
}
