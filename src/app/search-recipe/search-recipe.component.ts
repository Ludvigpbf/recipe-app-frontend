import { Component } from '@angular/core';
import { RecipeService } from '../recipe-service/recipe.service';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent {
  allRecipes: any;
  searchquery = '';

  constructor(private recipeService: RecipeService) {}

  getRecipes() {
    this.recipeService.getRecipes(this.searchquery).subscribe((result) => {
      let recipes = result.hits.map((data: any) => {
        let recipe = data.recipe;
        recipe.selfref = data._links.self.href;
        return recipe;
      });
      console.log(result.hits[5]);
      console.log(recipes);

      this.allRecipes = recipes;
    });
  }
}
