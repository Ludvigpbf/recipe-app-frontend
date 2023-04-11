import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';
import { ListService } from 'src/app/services/list-service/list.service';
import { ActivatedRoute } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { List } from 'src/app/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  favRecipeShow = false;
  loadRecipes = false;
  loadCreateList = false;
  oneRecipe: any;
  id = '';
  title = '';
  lists: List[] = [];
  favouriteList = '';

  ngOnInit() {
    this.getLists();
    this.listService
      .getListByTitle('Favourite recipes')
      .subscribe((response) => {
        if (response && response.list && response.list.title) {
          this.favouriteList = response.list.title;
          this.oneRecipe = response.list.recipes;
        }
      });
  }

  constructor(
    private listService: ListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  getLists() {
    this.listService
      .showLists()
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        this.lists = Object.values(res.lists);
        // console.log(this.lists); Prints array of lists
      }),
      catchError((error) => {
        console.error(error);
        console.log('this didnt work');
        return ['No lists found'];
      });
  }

  createList() {
    this.listService.createLists(this.title);
    /* this.loadCreateList = true; */
  }

  updateList(listId: number, newTitle: string) {
    this.listService.editList(listId, newTitle).subscribe(
      (res) => {
        // Handle successful response here, e.g. display success message
        console.log('List updated successfully');
        // Call function to retrieve updated lists
        this.getLists();
      },
      (error) => {
        // Handle error here, e.g. display error message
        console.error(error);
      }
    );
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
