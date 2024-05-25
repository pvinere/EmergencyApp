import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.page.html',
  styleUrls: ['./admin-notification.page.scss'],
})
export class AdminNotificationPage implements OnInit {

  title: string | undefined;
  nivel: string | undefined;
  timeAndDate: string | undefined;
  description: string | undefined;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private notificationService: NotificationService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.notificationService.requestPermission();
  }

  sendNotification() {
    const notificationData = {
      title: this.title,
      nivel: this.nivel,
      timeAndDate: this.timeAndDate,
      description: this.description
    };

    this.notificationService.sendNotification(notificationData).then(() => {
      this.presentAlert();
    });
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Emergency sent successfully.',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  logout() {
    this.notificationService.logout();
  }

  

}
