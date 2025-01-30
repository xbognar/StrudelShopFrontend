import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { AuthRequest } from '../../core/models/auth-request.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
})
export class LoginComponent implements OnInit {
  credentials: AuthRequest = { username: '', password: '' };
  errorMessage: string | null = null;
  returnUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin() {
    this.errorMessage = null; 
    this.authService.login(this.credentials).subscribe((success) => {
      if (success) {
        this.router.navigateByUrl(this.returnUrl!);
      } else {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }
}
