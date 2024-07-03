import { Component, Inject, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, isPlatform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/service';

import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formRegLogin: FormGroup;
  accountErrorMessage: string | undefined;
  userInfo = null;
  userName$: Observable<string> | undefined;

  constructor(
    public authService: AuthenticationService,
    private alertController: AlertController,
    private afs: AngularFirestore,
    public router: Router,
    private afAuth: AngularFireAuth,
    @Inject(SharedService) private sharedService: SharedService
  ) {
    this.formRegLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    GoogleAuth.initialize();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.sharedService.setUID(user.uid);
        this.router.navigate(['/tabs/home']);
      }
    });
  }

  async logIn(email: any, password: any) {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email.value, password.value);
      })
      .then((userCredential) => {
        const user = userCredential.user;
        this.sharedService.setUID(user.uid);
        console.log('User UID:', this.sharedService.uid);
        this.router.navigate(['/tabs/home']);
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/invalid-login-credentials':
          case 'auth/invalid-credential':
            errorMessage = 'Wrong Email or password!';
            break;
          default:
            errorMessage = 'Unexpected Error!';
            break;
        }
        this.presentAlert(errorMessage);
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

  async signInGoogle() {
    const auth = getAuth();
  
    if (isPlatform('capacitor')) {
      try {
        await GoogleAuth.initialize();  // Ensure that GoogleAuth is initialized
        const user = await GoogleAuth.signIn();
        if (!user.authentication.idToken) {
          throw new Error('No idToken found');
        }
        const credential = GoogleAuthProvider.credential(user.authentication.idToken);
        await setPersistence(auth, browserLocalPersistence);
        const result = await signInWithCredential(auth, credential);
  
        if (result.user) {
          const { displayName, email, uid } = result.user;
          console.log('Name Google:', displayName);
          console.log('Email:', email);
          console.log('UID from login:', uid);
  
          await this.afs.collection('users').doc(uid).set({
            name: displayName,
            email: email,
            uid: uid,
          });
  
          this.sharedService.setUID(uid);
          this.router.navigate(['/tabs/home']);
        } else {
          console.error('Credential is null');
        }
      } catch (error: any) {  // Use 'any' type for the error
        console.error('Error signing in with Google:', error);
        
        if (error.message) {
          console.error('Error message:', error.message);
        }
        if (error.stack) {
          console.error('Error stack:', error.stack);
        }
      }
    } else {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const user = result.user;
          const { displayName, email, uid } = user;
          console.log('Name Google:', displayName);
          console.log('Email:', email);
          console.log('UID from login:', uid);
  
          await this.afs.collection('users').doc(uid).set({
            name: displayName,
            email: email,
            uid: uid,
          });
  
          this.sharedService.setUID(uid);
          this.router.navigate(['/tabs/home']);
        })
        //ERROR HANDLING
        .catch((error: any) => {  
          console.error('Error signing in with Google:', error);
          if (error.message) {
            console.error('Error message:', error.message);
          }
          if (error.stack) {
            console.error('Error stack:', error.stack);
          }
          if (error.code) {
            console.error('Error code:', error.code);
          }
          if (error.customData) {
            console.error('Custom data:', error.customData);
          }
        });
    }
  }
}
