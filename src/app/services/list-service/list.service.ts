import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  configUrl = 'https://recipe-app-backend-production.up.railway.app/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  createLists(title: string) {
    this.http
      .post<any>(this.configUrl + 'list', { title: title }, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        console.log(res);
        window.location.reload();
      });
  }

  showLists(): Observable<any> {
    return this.http
      .get<any>(this.configUrl + 'lists', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getListByTitle(title: string): Observable<any> {
    return this.http
      .get<any>(this.configUrl + 'lists/' + title, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  editList(listId: number, title: string): Observable<any> {
    return this.http
      .put<any>(
        this.configUrl + 'editList' + listId,
        { title: title },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
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
