import { Component } from '@angular/core';
import {
  IonContent, IonCard, IonCardHeader, IonCardContent,
  IonCardTitle, IonItem, IonInput, IonLabel, IonTextarea,
  IonButton, IonText, IonList, IonToggle, IonFab, IonFabButton, IonIcon
} from "@ionic/angular/standalone";
import { Router } from '@angular/router';

import { Item } from '../../../interfaces/item';
import { Clipboard } from '../../../interfaces/clipboard';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  standalone: true,
  imports: [IonIcon, IonFabButton, IonFab, IonToggle, IonList, IonText, IonButton, IonTextarea, IonLabel, IonContent,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonItem, IonInput, FormsModule],
})
export class CreateFormComponent {

  idClipboard: number = 1;
  title: string = '';
  description: string = '';

  itemId: number = 0;
  itemValue: string = '';
  itemChecked: boolean = false;

  itens: Item[] = [];
  showItems: boolean = false;

  constructor(
    private router: Router
  ) { }

  toggleItems() {
    if (this.showItems) {
      this.showItems = !this.showItems;
      this.itens = [];
    } else {
      this.showItems = !this.showItems;
      this.itens = [{
        id: this.itemId++,
        value: this.itemValue,
        checked: this.itemChecked
      }];
    }
  }
  newItem() {
    this.itens.push({
      id: this.itemId++,
      value: this.itemValue,
      checked: this.itemChecked
    });

  }

  createItem() {
    const clipboard: Clipboard = {
      id: this.idClipboard++,
      title: this.title,
      description: this.description,
      items: this.itens
    };
    console.log(clipboard);

    this.title = '';
    this.description = '';
    this.itens = [];

    this.router.navigate(['tabs/clipboard']);

  }

  deleteItem(itemId: number) {
    this.itens = this.itens.filter(item => item.id !== itemId);
  }

  onSubmit() {
    console.log('Form submitted');
  }


}
