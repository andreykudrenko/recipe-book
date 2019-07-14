import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInput;
  @ViewChild('amountInput', {static: false}) amountInput;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
  }

  addIngredient() {
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;
    if (name.length > 0 && amount > 0) {
      const newIngredient = new Ingredient(name, amount);
      this.slService.addIngridient(newIngredient);
    }
  }

}
