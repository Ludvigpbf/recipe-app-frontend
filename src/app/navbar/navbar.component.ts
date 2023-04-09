import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  me = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  auth: any;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.auth = localStorage.getItem('token');
  }

  logOut() {
    this.authService.logOutUser(this.me);
    localStorage.clear();
    this.router.navigate(['/home']);
    /* window.location.replace(
      'https://symphonious-mooncake-466ef9.netlify.app/home'
    ); */
  }
}
