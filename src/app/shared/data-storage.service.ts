import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipes() {
    const recipe = this.recipeService.getRecipes();
    this.http.put('https://my-recipe-book-6380c.firebaseio.com/recipes.json', recipe)
      .subscribe(
      req => {
        console.log(req);
      }
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://my-recipe-book-6380c.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(
          recipes => {
            this.recipeService.setRecipe(recipes);
          }
        )
    );
  }
}
