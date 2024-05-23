import { Component, Inject, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, isPlatform } from '@ionic/angular';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { SharedService } from '../shared/service';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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
    @Inject(SharedService)private sharedService: SharedService
  ) {
    this.formRegLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to home page
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
        console.log("User UID:", this.sharedService.uid);
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
      buttons: ['OK']
    });
    await alert.present();
  }

  signInGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return signInWithPopup(auth, provider);
      })
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
          const user = result.user;
          console.log('user:', user);

          const name = user.displayName;
          console.log("Name Google: " + name);
          const email = user.email;
          const uid = user.uid;
          console.log("UID from login: " + uid);

          this.afs.collection('users').doc(uid).set({
            name: name,
            email: email,
            uid: uid
          });

          this.sharedService.uid = uid;
          this.router.navigate(['/tabs/home']);
        } else {
          console.error("Credential is null");
        }
      })
      .catch((error) => {
        console.error('Error signing in with Google:', error);
      });
  }
}
