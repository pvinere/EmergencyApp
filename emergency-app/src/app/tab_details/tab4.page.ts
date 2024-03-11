import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { getAuth, signOut,reauthenticateWithCredential, AuthCredential } from "firebase/auth";
import { Router } from '@angular/router';
import { SharedService } from '../shared/service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { take } from 'rxjs';
import { AlertController } from '@ionic/angular';
import 'firebase/compat/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{
  @ViewChild('nameModal') nameModal: any;
  @ViewChild('passModal') passModal: any;
 

  message = 'Name change succesfuly!';
  name: string | undefined;
  uid: string | undefined;
  name_change:any;
  isGoogleSignInUser = false;
  newPassword: string = '';
  oldPassword: string = '';
  email: string= '';
  
  

  constructor(public router: Router, 
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    @Inject(SharedService)private sharedService: SharedService) {
      this.uid = this.sharedService.uid;
  }
  ngOnInit(): void {
    this.checkAppMode();
    this.checkGoogleSignInUser();
  }

  ionViewWillEnter() {
    this.checkGoogleSignInUser();
  }

  async checkGoogleSignInUser() {
    const user = await this.afAuth.authState.pipe(take(1)).toPromise(); // Get the current user
    if (user) {
      const providerId = user.providerData[0]?.providerId; // Get the provider ID of the first provider
      if (providerId === 'google.com') {
        this.isGoogleSignInUser = true; // User has signed in with Google
      }
    }
  }

  
  changeName(newName: string) {
    const uid = this.sharedService.uid; // Replace 'your_user_id' with the actual user ID
    this.afs.collection('users').doc(uid).update({ name: newName }) // Update the 'name' field in the 'users' collection
      .then(() => {
        console.log('Name updated successfully');
      })
      .catch(error => {
        console.error('Error updating name:', error);
      });
  }

  

  async confirmModal_name(){
    
    console.log('name_change',this.name_change);
    this.changeName(this.name_change);
    await this.nameModal.dismiss();
    this.presentAlert(this.message);
  }

  async dismissModal_name() {
    await this.nameModal.dismiss();
  }

  async confirmModal_pass(){
    await this.passModal.dismiss();
    
    
  }

  async dismissModal_pass() {
    await this.passModal.dismiss();
  }

  async changePassword() {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) {
        throw new Error('User not signed in');
      }

      const credential = firebase.default.auth.EmailAuthProvider.credential(
        this.email,
        this.oldPassword
      );

      await user.reauthenticateWithCredential(credential);

      await user.updatePassword(this.newPassword);
      this.newPassword = '';
      this.oldPassword = '';
      // Show success message or navigate to another page
      console.log('Password changed successfully');
      this.presentAlertPass('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      // Show error message to the user
      this.presentAlertPass('E-Mail/Old password invalid!');
    }
  }

  signOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('uid');
      this.sharedService.uid = undefined;
      this.router.navigate(['/first-page']);
    })

   }
 
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'NAME CHANGED',
      message: message,
      buttons: ['OK']
    });

    

    await alert.present();
  
}

async presentAlertPass(message: string) {
  const alert = await this.alertController.create({
    header: 'PASSWORD CHANGE',
    message: message,
    buttons: ['OK']
  });

  

  await alert.present();

}

darkMode = true;

  async checkAppMode() {
  
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    console.log(checkIsDarkMode);
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }
  toggleDarkMode() {
    this.sharedService.toggleDarkMode();
  }
  
}
