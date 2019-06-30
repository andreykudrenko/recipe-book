import {Recipe} from './recipe.model';

export class RecipeService {
  recipes: Recipe[] = [
    new Recipe('A test Recipe 1', 'This is simply a test',
      'https://hips.hearstapps.com/del.h-cdn.co/assets/18/11/2048x1024/landscape-1520957481-grilled-salmon-horizontal.jpg?resize=1200:*'),
    new Recipe('A test Recipe 2', 'This is a new recipe',
      'https://images-gmi-pmc.edge-generalmills.com/23bcd559-1e27-4c54-90a7-812690764c7f.jpg')
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
