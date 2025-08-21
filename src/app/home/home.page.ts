import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonCardContent,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, heart, checkmark } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonCardContent,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton
  ],
})
export class HomePage {
  constructor() {
    addIcons({ add, heart, checkmark });
  }
}