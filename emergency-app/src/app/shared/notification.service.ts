import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private afAuth: AngularFireAuth,
    private firestore: AngularFirestore, 
    private router: Router,
    private afMessaging: AngularFireMessaging) { }

  requestPermission() {
    this.afMessaging.requestToken.subscribe(
      (token) => { console.log('Permission granted! Save to the server!', token); },
      (error) => { console.error(error); },
    );
  }

  sendNotification(notificationData: any) {
    
    return this.firestore.collection('notifications').add(notificationData);
  }

  logout() {
    
      
      this.router.navigate(['/first-page']);
    
  }
}