import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  isAdmin: boolean | undefined;
  email: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (result.user) {
        this.checkAdminRole(result.user.uid);
        
      }
    } catch (error) {
      console.error(error);
      this.presentAlert("Autehntication failed! Please try again!");
    }
  }

  checkAdminRole(uid: string) {
    this.db.collection('users').doc(uid).valueChanges().pipe(
      take(1),
      map((doc: any) => doc ? doc['role'] === 'isAdmin' : false)
    ).subscribe(async isAdmin => {
      this.isAdmin = isAdmin;
      if (isAdmin) {
        console.log("Admin Logged in successfully");
        this.router.navigate(['/admin-notification']);
      } 
      else {
        this.presentAlert("You are not an admin!");
        await this.afAuth.signOut();
        //this.router.navigate(['/login']);
      }
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Eroare',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  
}
