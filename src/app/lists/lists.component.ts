import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe-service/recipe.service';
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
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}
}
