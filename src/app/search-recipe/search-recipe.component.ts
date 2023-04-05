import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../services/recipe-service/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent {
  allRecipes: any;
  searchquery = '';
  loadRecipes = false;
  word = '""';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      console.log(params['search']);
      this.searchquery = params['search'];
      if (this.searchquery) {
        this.getRecipes();
      }
    });
  }

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  getRecipes() {
    this.loadRecipes = true;
    this.recipeService.getRecipes(this.searchquery).subscribe((result) => {
      this.loadRecipes = false;
      let searchedWord = this.searchquery;
      let recipes = result.hits.map((data: any) => {
        let recipe = data.recipe;
        recipe.idref = data._links.self.href.slice(38, 70);
        return recipe;
      });
      /* console.log(recipes); */ // Prints recipes
      this.allRecipes = recipes;
      /* console.log(searchedWord); */ // Prints the searched word
      this.word = searchedWord;
    });
  }
}
