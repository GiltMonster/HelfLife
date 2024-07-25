import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { clipboard, home, camera, personCircle } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(
    private router: Router
  ) {
    addIcons({ clipboard, home, camera, personCircle });
  }

  navigatePage(page: string) {
    switch (page) {
      case 'clipboard':
        this.router.navigate(['tabs/clipboard']);
        break;

      case 'home':
        this.router.navigate(['tabs/home']);
        break;

      case 'camera':
        this.router.navigate(['tabs/camera']);
        break;

      case 'profile':
        this.router.navigate(['tabs/profile']);
        break;
    }
  }

}
