import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonMenu,
  IonMenuButton, IonMenuToggle, IonList, IonItem, IonLabel, IonIcon
} from '@ionic/angular/standalone';
import { FoodCardsComponent } from 'src/app/components/home/food-cards/food-cards.component';
import { FoodCategoriesComponent } from "../../components/home/food-categories/food-categories.component";
import { PlatformService } from 'src/app/services/platform.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, clipboard } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonIcon, IonLabel, IonItem, IonList, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent,
    FoodCategoriesComponent, FoodCardsComponent, IonMenu, IonMenuButton, IonMenuToggle
  ]
})
export class HomePage {

  public month: string = '';
  public isMobile: boolean = this.platformService.isMobile();
  public listRoutes: string[] = this.getRoutes();

  constructor(
    public platformService: PlatformService,
    public router: Router
  ) {

    addIcons({ home, clipboard });


    if (this.platformService.isMobile()) {
      this.router.navigate(['/tabs/home']);
    } else {
      this.router.navigate(['/home']);
      console.log('getRoutes', this.getRoutes());

    }
  }

  getRoutes(): string[] {
    const routes: string[] = [];
    this.router.config.forEach((route) => {
      if (route.path) {
        routes.push(route.path);
      }
      if (route.children) {
        route.children.forEach((childRoute) => {
          if (childRoute.path) {
            routes.push(`${route.path}/${childRoute.path}`);
          }
        });
      }
    });
    return routes;
  }


  getMonth(): string {
    return `Better food for ${this.month = new Date().toLocaleString('default', { month: 'long' })}`;
  }


}
