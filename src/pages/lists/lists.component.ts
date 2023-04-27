import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';
import { ListService } from 'src/app/services/list-service/list.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { List } from 'src/app/list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  // Progress-spinners
  favRecipeShow = false;
  loadData = false;
  loadCreateList = false;
  loadEditList = false;

  // Recipe variable
  oneRecipe: any;

  // Get lists
  lists: List[] = [];
  favouriteList = '';

  // Create a list
  title = '';

  // Update a list
  listId: number = 0;
  newListTitle = '';
  selectedListId: any;

  ngOnInit() {
    this.loadData = true;
    this.getLists();
    /* this.listService
      .getListByTitle('Favourite recipes')
      .subscribe((response) => {
        if (response && response.list && response.list.title) {
          this.favouriteList = response.list.title;
          this.oneRecipe = response.list.recipes;
        }
      }); */
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
        this.loadData = false;
        this.loadEditList = false;
        console.log(this.lists);
      }),
      catchError((error) => {
        console.error(error);
        console.log('this didnt work');
        return ['No lists found'];
      });
  }

  createList() {
    this.loadCreateList = true;
    this.listService.createLists(this.title);
  }

  onListSelect() {
    // Update the listId variable with the selected list's id
    this.listId = this.selectedListId;
  }

  updateList(listId: number, newListTitle: string) {
    console.log(this.selectedListId);
    console.log(this.newListTitle);
    console.log(this.listId);
    if (!listId || !newListTitle) {
      // Validate listId and newListTitle values
      console.error('Invalid data');
      return;
    }
    this.loadEditList = true;
    return this.listService.editList(listId, newListTitle).subscribe(
      (res) => {
        // Handle successful response here, e.g. display success message
        console.log('List updated successfully');
        // Call function to retrieve updated lists
        this.getLists();
        this.loadEditList = false;
      },
      (error) => {
        console.error(error);
        throw new Error('Failed to update list');
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
