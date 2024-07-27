import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFabButton, IonFab, IonIcon, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { addCircle, closeCircle } from "ionicons/icons";
import { Router } from "@angular/router";

@Component({
  selector: 'app-clipboard',
  templateUrl: 'clipboard.page.html',
  styleUrls: ['clipboard.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonFab, IonFabButton, IonHeader, IonToolbar, IonTitle, IonContent, IonFabButton, IonIcon],
})
export class ClipboardPage {

  showFab = true;

  constructor(
    private router: Router
  ) {
    addIcons({ addCircle, closeCircle });
  }

  create() {
    this.router.navigate(['tabs/clipboard/create'])
    this.showFab = false;
  }
}
