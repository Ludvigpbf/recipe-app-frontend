import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //from form
  me = {
    id: 0,
    name: '',
    email: 'nkoch@example.org',
    password: 'password',
  };

  user1 = {
    id: 0,
    name: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {
    //authService.loginUser(this.me); // ska ej ha denna!!!
  }

  login() {
    this.authService.loginUser(this.me);
  }

  getUser() {
    this.authService.getUser1().subscribe((res) => {
      console.log(res[0]);
      this.user1 = res[0];
    });
  }
}
