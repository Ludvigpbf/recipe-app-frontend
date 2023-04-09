import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  me = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  loadLogin = false;
  auth: any;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.loginUser(this.me);
    this.loadLogin = true;
    this.auth = localStorage.getItem('token');
    this.router.navigate(['/search-recipe']).then(() => {
      window.location.reload();
    });
    /* this.router.navigate(['/search-recipe']); */
  }

  // Get a user

  /* user1 = {
    id: 0,
    name: '',
    email: 'nkoch@example.org',
    password: 'password',
  };

  getUser() {
    this.authService.getUser1().subscribe((res) => {
      console.log(res[0]);
      this.user1 = res[0];
    });
  } */
}
