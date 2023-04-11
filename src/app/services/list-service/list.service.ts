import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { List } from 'src/app/list';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  configUrl = 'http://127.0.0.1:8000/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  createLists(title: string) {
    console.log(title);
    this.http
      .post<any>(this.configUrl + 'list', { title: title }, this.httpOptions)
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
