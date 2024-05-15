import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

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

  constructor(private afAuth: AngularFireAuth,private router: Router) { }

  ngOnInit() {
  }

  sendNotification() {
    // Implement your notification sending logic here
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/first-page']);
    } catch (error) {
      console.error('Error during sign out', error);
    }
  }

}
