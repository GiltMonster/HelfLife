import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow, IonImg, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

import { PhotoService } from 'src/app/services/photo.service';
import { UserPhoto } from 'src/app/interfaces/userPhoto';
import { ActionSheetController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trash, close } from "ionicons/icons";


@Component({
  selector: 'app-camera',
  templateUrl: 'camera.page.html',
  styleUrls: ['camera.page.scss'],
  standalone: true,
  imports: [IonIcon, IonFabButton, IonFab, IonImg, IonRow, IonGrid, IonCol, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class CameraPage implements OnInit{
  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {
    addIcons({ trash, close });
   }

  ngOnInit(): void {
    this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addToGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const action = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet will automatically close
        }
      }]
    });
    await action.present();
  }
}
