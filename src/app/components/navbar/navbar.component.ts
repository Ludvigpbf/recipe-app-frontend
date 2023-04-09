import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

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
    /* window.location.reload(); */
    /* this.router.navigate(['']); */
    /* window.location.replace('https://symphonious-mooncake-466ef9.netlify.app'); */
  }
}
