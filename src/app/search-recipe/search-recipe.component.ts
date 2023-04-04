import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe-service/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.scss'],
})
export class SearchRecipeComponent {
  allRecipes: any;
  searchquery = '';
  showSpinner = false;
  private routeSub: Subscription = new Subscription();

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      /* console.log(params);
      console.log(params['id']); */
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  getRecipes() {
    this.showSpinner = true;
    this.recipeService.getRecipes(this.searchquery).subscribe((result) => {
      this.showSpinner = false;
      this.cd.detectChanges();
      let recipes = result.hits.map((data: any) => {
        let recipe = data.recipe;
        recipe.idref = data._links.self.href.slice(38, 70);
        return recipe;
      });
      console.log(recipes);

      this.allRecipes = recipes;
    });
  }

  /*  loadRecipes() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  } */
}
