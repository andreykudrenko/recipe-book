import {EventEmitter, Injectable} from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  public recipeSelected = new EventEmitter<Recipe>();
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

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
