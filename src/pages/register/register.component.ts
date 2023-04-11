import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../app/services/auth-service/auth.service';
import { ListService } from 'src/app/services/list-service/list.service';

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

  loadRegister = false;

  constructor(
    private authService: AuthService,
    private listService: ListService,
    private router: Router
  ) {}

  register() {
    this.authService.registerUser(this.newUser);
    /* this.router.navigate(['/login']); */
    this.loadRegister = true;
  }
}
