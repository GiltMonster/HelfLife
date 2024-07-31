import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { FoodCardsComponent } from 'src/app/components/home/food-cards/food-cards.component';
import { FoodCategoriesComponent } from "../../components/home/food-categories/food-categories.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, FoodCategoriesComponent, FoodCardsComponent]
})
export class HomePage {

  public month: string = '';

  constructor() {
  }

  getMonth(): string {
    return `Better food for ${this.month = new Date().toLocaleString('default', { month: 'long' })}`;
  }


}
