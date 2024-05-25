import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private afAuth: AngularFireAuth,private firestore: AngularFirestore, private router: Router) { }

  

  sendNotification(notificationData: any) {
    
    return this.firestore.collection('notifications').add(notificationData);
  }

  logout() {
    
      
      this.router.navigate(['/first-page']);
    
  }
}