import {EventEmitter, Injectable} from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChages = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Beef Steak',
      'Excellent and very healthy beef steak',
      'https://static.1000.menu/img/content/25349/pravilnyi-steik-iz-govyadiny_1518083846_13_max.jpg',
      [
        new Ingredient('Beef Meat', 1),
        new Ingredient('Tomatoes', 2),
      ]),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'http://primebeef.ru/images/cms/data/img_3911.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Cheese', 1),
        new Ingredient('Meat', 1),
      ])
  ];
  constructor(private slService: ShoppingListService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChages.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChages.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChages.next(this.recipes.slice());
  }
}
