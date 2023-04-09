import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe-service/recipe.service';
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
  recipeShow = false;
  word = '""';

  filter = {
    starter: false,
    main: false,
    dessert: false,
    glutenfree: false,
    vegetarian: false,
    vegan: false,
  };

  filterText = {
    starter: '&dishType=starter',
    main: '&dishType=Main%20course',
    dessert: '&dishType=Desserts',
    glutenfree: '&health=gluten-free',
    vegetarian: '&health=vegetarian',
    vegan: '&health=vegan',
  };

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
    this.recipeShow = false;

    let filterQuery = '';
    if (this.filter.starter) {
      filterQuery += this.filterText.starter;
    }
    if (this.filter.main) {
      filterQuery += this.filterText.main;
    }
    if (this.filter.dessert) {
      filterQuery += this.filterText.dessert;
    }
    if (this.filter.glutenfree) {
      filterQuery += this.filterText.glutenfree;
    }
    if (this.filter.dessert) {
      filterQuery += this.filterText.vegetarian;
    }
    if (this.filter.dessert) {
      filterQuery += this.filterText.vegan;
    }
    console.log(filterQuery);
    this.recipeService
      .getRecipes(this.searchquery, filterQuery)
      .subscribe((result) => {
        this.recipeShow = true;
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
