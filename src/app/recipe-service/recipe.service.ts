import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  appid = 'd75cfcf2';
  appkey = '596455008afb3026ede5c7afee8584e9';
  urlConfig = 'https://api.edamam.com/api/recipes/v2?type=public';
  urlConfigId = 'https://api.edamam.com/api/recipes/v2?type=public' + id;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
    }),
  };
  constructor(private http: HttpClient) {}

  getRecipes(q: string) {
    let searchquery =
      this.urlConfig +
      '&q=' +
      q +
      '&app_id=' +
      this.appid +
      '&app_key=' +
      this.appkey;

    return this.http.get<any>(searchquery, this.httpOptions);
  }

  getOneRecipe(qOne: string) {
    let oneSearchQuery =
      this.urlConfigId +
      '&q=' +
      qOne +
      '&app_id=' +
      this.appid +
      '&app_key=' +
      this.appkey;

    return this.http.get<any>(oneSearchQuery, this.httpOptions);
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
