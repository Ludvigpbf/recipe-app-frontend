import { Component } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';
import { ListService } from 'src/app/services/list-service/list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
  favRecipeShow = false;
  loadRecipes = false;
  oneRecipe: any;
  id = '';

  newList = {
    title: '',
  };

  ngOnInit() {
    this.loadRecipes = true;
    // should be function: getFavouriteRecipes()
    this.recipeService.getRecipeId(this.id).subscribe((result) => {
      this.favRecipeShow = true;
      this.loadRecipes = false;
      this.oneRecipe = result;
      /* console.log(recipes); */ // Prints recipes
    });
  }

  constructor(
    private listService: ListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  createList() {
    this.listService.createLists(this.newList);
    /* this.loadRecipes = true; */
  }
  newUser(newUser: any) {
    throw new Error('Method not implemented.');
  }
}
