import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderStandardComponent } from '../../components/header-standard/header-standard.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, RouterModule, HeaderStandardComponent, FooterComponent],
})
export class RegisterComponent {
  newUser: User = {
    userID: 0,
    username: '',
    passwordHash: '',
    role: 'User', // Default role
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
  };
  errorMessage: string | null = null;

  constructor(private userService: UserService) { }

  onRegister() {
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        console.log('Registration successful');
      },
      error: () => {
        this.errorMessage = 'Registration failed. Please try again.';
      },
    });
  }
}
