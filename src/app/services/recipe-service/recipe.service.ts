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
  urlConfig = 'https://api.edamam.com/api/recipes/v2/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
    }),
  };
  constructor(private http: HttpClient) {}

  getRecipes(q: string, filter: string) {
    let searchquery =
      this.urlConfig +
      '?type=public&q=' +
      q +
      '&app_id=' +
      this.appid +
      '&app_key=' +
      this.appkey +
      filter +
      '&field=label' +
      '&field=idref' +
      '&field=image' +
      '&field=ingredientLines' +
      '&field=yield' +
      '&field=shareAs' +
      '&field=totalTime' +
      '&field=healthLabels' +
      '&field=dietLabels' +
      '&field=mealType' +
      '&field=dishType' +
      '&field=cuisineType';
    return this.http.get<any>(searchquery, this.httpOptions);
  }

  getRecipeId(id: string) {
    let oneSearchQuery =
      this.urlConfig +
      id +
      '?type=public&app_id=' +
      this.appid +
      '&app_key=' +
      this.appkey +
      '&field=label' +
      '&field=idref' +
      '&field=image' +
      '&field=ingredientLines' +
      '&field=yield' +
      '&field=shareAs' +
      '&field=totalTime' +
      '&field=healthLabels' +
      '&field=dietLabels' +
      '&field=mealType' +
      '&field=dishType' +
      '&field=cuisineType';

    return this.http.get<any>(oneSearchQuery, this.httpOptions);
  }
}
