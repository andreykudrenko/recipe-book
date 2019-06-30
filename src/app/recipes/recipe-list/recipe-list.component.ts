import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  providers: [RecipeService]
})
export class RecipeListComponent implements OnInit {
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  recipes: Recipe[];

  constructor(private rescipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.rescipeService.getRecipes();
  }

  onSelectRecipe(recipeEl: Recipe) {
    this.selectedRecipe.emit(recipeEl);
  }

}
