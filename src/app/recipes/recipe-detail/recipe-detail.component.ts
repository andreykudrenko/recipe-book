import {map, switchMap} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../../recipes/store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map((params: Params) => {
          return +params.id;
        }),
        switchMap(id => {
          this.id = id;
          return this.store
            .select('recipes')
            .pipe(
              map(recipesState => {
                return recipesState.recipes.find((recipe, index) => {
                  return index === id;
                });
              })
            );
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
