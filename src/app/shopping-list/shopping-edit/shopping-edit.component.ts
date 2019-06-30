import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @Output() onCreateIngredient = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', {static: false}) nameInput;
  @ViewChild('amountInput', {static: false}) amountInput;

  constructor() { }

  ngOnInit() {
  }

  onAddIngredient() {
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;
    if (name.length > 0 && amount > 0) {
      this.onCreateIngredient.emit(new Ingredient(name, amount));
    }
  }

}
