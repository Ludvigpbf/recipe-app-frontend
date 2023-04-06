import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  newUser = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.registerUser(this.newUser);
    console.log(this.newUser);
    /* this.router.navigate(['/search-recipe']); */
  }
}
