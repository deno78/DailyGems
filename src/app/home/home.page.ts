import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  IonGrid,
  IonRow,
  IonCol,
  IonCheckbox,
  IonInput,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, heart, checkmark, shareSocial, informationCircle } from 'ionicons/icons';
import * as QRCode from 'qrcode';

interface Task {
  id: string;
  name: string;
  achievements: { [dateKey: string]: boolean };
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonGrid,
    IonRow,
    IonCol,
    IonCheckbox,
    IonInput,
    IonItem,
    IonLabel
  ],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTaskName: string = '';
  rewardText: string = '';
  weekDays: { date: Date; dateKey: string; dayName: string }[] = [];
  shareQRCode: string = '';
  
  constructor() {
    addIcons({ add, heart, checkmark, shareSocial, informationCircle });
  }

  ngOnInit() {
    this.generateWeekDays();
    this.loadDataFromStorage();
    this.generateQRCodes();
  }

  generateWeekDays() {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDay);

    this.weekDays = [];
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      
      this.weekDays.push({
        date: date,
        dateKey: this.formatDateKey(date),
        dayName: dayNames[i]
      });
    }
  }

  formatDateKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  addTask() {
    if (this.newTaskName.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        name: this.newTaskName.trim(),
        achievements: {}
      };
      this.tasks.push(newTask);
      this.newTaskName = '';
      this.saveDataToStorage();
    }
  }

  toggleAchievement(taskId: string, dateKey: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.achievements[dateKey] = !task.achievements[dateKey];
      this.saveDataToStorage();
    }
  }

  isAchieved(task: Task, dateKey: string): boolean {
    return task.achievements[dateKey] || false;
  }

  saveDataToStorage() {
    const data = {
      tasks: this.tasks,
      rewardText: this.rewardText
    };
    localStorage.setItem('dailyGems_taskData', JSON.stringify(data));
  }

  loadDataFromStorage() {
    const stored = localStorage.getItem('dailyGems_taskData');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        this.tasks = data.tasks || [];
        this.rewardText = data.rewardText || '';
      } catch (error) {
        console.error('Error loading data from storage:', error);
      }
    }
  }

  onRewardTextChange() {
    this.saveDataToStorage();
  }

  async generateQRCodes() {
    try {
      // GitHub Pages URL for sharing
      const shareUrl = 'https://deno78.github.io/DailyGems/';

      // Generate share QR code
      this.shareQRCode = await QRCode.toDataURL(shareUrl, {
        width: 150,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    } catch (error) {
      console.error('Error generating QR codes:', error);
    }
  }
}