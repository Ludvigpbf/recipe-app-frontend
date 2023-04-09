import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchRecipeComponent } from '../pages/search-recipe/search-recipe.component';
import { ListsComponent } from '../pages/lists/lists.component';
import { AboutComponent } from '../pages/about/about.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { RecipeDetailsComponent } from '../pages/recipe-details/recipe-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-recipe/:search', component: SearchRecipeComponent },
  { path: 'search-recipe', component: SearchRecipeComponent },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
  { path: 'lists/:id', component: ListsComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
