import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe-service/recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  oneRecipe: any;
  id = '';

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      console.log(params['id']);
      this.id = params['id'];

      this.recipeService.getRecipeId(this.id).subscribe((result) => {
        this.oneRecipe = result;
        console.log(result);
      });
    });
  }
}
