import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  configUrl = 'https://recipe-app-backend-production.up.railway.app/api/';
  /* configUrl = 'https://recipe-app-backend-production.up.railway.app/api/'; */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user: User) {
    this.http
      .post<any>(this.configUrl + 'register', user, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        console.log(res);
        /* localStorage.setItem('id', res.user.id);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('token', res.token); */
        /* window.location.reload(); */
        /*  window.location.replace(
          'https://symphonious-mooncake-466ef9.netlify.app/login'
        ); */
      });
  }

  loginUser(user: User) {
    this.http
      .post<any>(this.configUrl + 'login', user, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        console.log(res);
        localStorage.setItem('id', res.user.id);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('token', res.token);
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
        /* window.location.reload(); */
        /* window.location.replace(
          'https://symphonious-mooncake-466ef9.netlify.app/search-recipe'
        ); */
      });
  }

  logOutUser(user: User) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    this.http
      .post<any>(this.configUrl + 'logout', user, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        console.log(res);
        /*  localStorage.clear(); */
        /*  window.location.replace('http://localhost:4200/'); */
      });
  }

  /* getUser1() {
    console.log(localStorage.getItem('token'));
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'Bearer ' + localStorage.getItem('token')
    );
    return this.http
      .get<User[]>(this.configUrl + 'getuser/1', this.httpOptions)
      .pipe(catchError(this.handleError));
  } */

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
