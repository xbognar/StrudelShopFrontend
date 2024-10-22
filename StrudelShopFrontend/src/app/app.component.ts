import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [HomeComponent, HttpClientModule]
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
    this.authService.login().subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        console.log('Login successful, token stored');
      },
      error: (err) => console.error('Login failed', err)
    });

    this.authService.startTokenRefresh();
  }
}
