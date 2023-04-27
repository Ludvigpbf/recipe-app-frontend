import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/services/list-service/list.service';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { List } from 'src/app/list';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  oneRecipe: any;
  id = '';
  lists: List[] = [];
  selectedListId: number = 0;

  constructor(
    private listService: ListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getLists();
    this.route.params.subscribe((params) => {
      //  console.log(params); Logs id params
      // console.log(params['id']); Logs id
      this.id = params['id'];
      console.log(this.id);
      this.recipeService.getRecipeId(this.id).subscribe((result) => {
        this.oneRecipe = result;
        console.log(this.oneRecipe);
      });
    });
  }

  getLists() {
    this.listService
      .showLists()
      .pipe(catchError(this.handleError))
      .subscribe((res) => {
        // Assuming res.lists is an array of list objects
        this.lists = Object.values(res.lists);
        // Filter out the "favourite recipes" list from the list of lists
        this.lists = this.lists.filter(
          (list) => list.title !== 'Favourite recipes'
        );
      }),
      catchError((error) => {
        console.error(error);
        return ['No lists found'];
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
