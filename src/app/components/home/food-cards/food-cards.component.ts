import { Component, Input, OnInit } from '@angular/core';
import {
  IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonRow, IonImg,
  IonCol, IonText, IonCardSubtitle, IonLabel, IonButton, IonIcon, IonContent } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { heart, heartOutline } from "ionicons/icons";
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-food-cards',
  templateUrl: './food-cards.component.html',
  styleUrls: ['./food-cards.component.scss'],
  imports: [IonContent, IonIcon, IonButton, IonLabel, IonCardSubtitle, IonText,
    IonCol, IonImg, IonRow, IonCardContent, IonCardHeader, IonCardTitle, IonCard],
  standalone: true
})
export class FoodCardsComponent {

  @Input() titleCategory?: string;
  @Input() typeCard?: string;

  public cards: any[] = [
    {
      title: 'Pizza',
      subtitle: 'Italian',
      description: 'Pizza is a savory dish of Italian origin consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
    {
      title: 'Burger',
      subtitle: 'American',
      description: 'A hamburger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
    {
      title: 'Sushi',
      subtitle: 'Japanese',
      description: 'Sushi is a Japanese dish of prepared vinegared rice, usually with some sugar and salt, accompanying a variety of ingredients, such as seafood, vegetables, and occasionally tropical fruits.',
      image: 'https://picsum.photos/400/250',
      favorite: true
    },
    {
      title: 'Pasta',
      subtitle: 'Italian',
      description: 'Pasta is a type of food typically made from an unleavened dough of wheat flour mixed with water or eggs, and formed into sheets or other shapes, then cooked by boiling or baking.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
    {
      title: 'Taco',
      subtitle: 'Mexican',
      description: 'A taco is a traditional Mexican dish consisting of a small hand-sized corn or wheat tortilla topped with a filling. The tortilla is then folded around the filling and eaten by hand.',
      image: 'https://picsum.photos/400/250',
      favorite: true
    },
    {
      title: 'Ice Cream',
      subtitle: 'American',
      description: 'Ice cream is a sweetened frozen food typically eaten as a snack or dessert. It may be made from dairy milk or cream and is flavored with a sweetener, either sugar or an alternative.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
    {
      title: 'Donut',
      subtitle: 'American',
      description: 'A doughnut or donut is a type of fried dough confection or dessert food. The doughnut is popular in many countries and prepared in various forms as a sweet snack that can be homemade or purchased in bakeries, supermarkets, food stalls, and franchised specialty vendors.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
    {
      title: 'Coffee',
      subtitle: 'American',
      description: 'Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species. The genus Coffea is native to tropical Africa and Madagascar, the Comoros, Mauritius, and Réunion in the Indian Ocean.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
    {
      title: 'Cupcake',
      subtitle: 'American',
      description: 'A cupcake is a small cake designed to serve one person, which may be baked in a small thin paper or aluminum cup. As with larger cakes, icing and other cake decorations such as fruit and candy may be applied.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
    {
      title: 'Pancake',
      subtitle: 'American',
      description: 'A pancake is a flat cake, often thin and round, prepared from a starch-based batter that may contain eggs, milk, and butter and cooked on a hot surface such as a griddle or frying pan, often frying with oil or butter.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
    {
      title: 'Salad',
      subtitle: 'American',
      description: 'A salad is a dish consisting of a mixture of small pieces of food, usually vegetables or fruit. However, different varieties of salad may contain virtually any type of ready-to-eat food.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
    {
      title: 'Sandwich',
      subtitle: 'American',
      description: 'A sandwich is a food typically consisting of vegetables, sliced cheese or meat, placed on or between slices of bread, or more generally any dish wherein bread serves as a container or wrapper for another food type.',
      image: 'https://picsum.photos/400/250',
      favorite: false
    },
  ];
  public isMobile: boolean;

  constructor(
    public platformService: PlatformService
  ) {
    addIcons({ heart, heartOutline });
    console.log('card is mobile:', this.platformService.isMobile());

    this.isMobile = this.platformService.isMobile();
  }

}
