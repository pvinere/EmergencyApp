import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, isPlatform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { SharedService } from '../shared/service';

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

    if(!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }


    this.formRegLogin = new FormGroup({
      
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
     
    },
  
    );
  }

  ngOnInit(): void {
   

  }
  async logIn(email: any, password: any) {
    try {
      await this.authService.SignIn(email.value, password.value);
  
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const uid = user.uid;
  
          this.sharedService.setUID(uid);

          console.log("User UID:", this.sharedService.uid);
          this.router.navigate(['/tabs/home']);
        }
      });
    } catch (error:any) {
      let errorMessage = '';
      switch (error.code) {
        case 'auth/invalid-login-credentials':
          errorMessage = 'Wrong Email or password!';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Wrong Email or password!';
          break;
        default:
          errorMessage = 'Unexpected Error!';
          break;
      }
      this.presentAlert(errorMessage);
    }
  }
  
  
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Eroare',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  
    
  
  
}

async signInGoogle() {
  try {
    const googleUser = await GoogleAuth.signIn() as any;
    console.log('user:', googleUser);
    this.userInfo = googleUser;

    const name = googleUser.givenName;
    console.log("Name Google:");
    const email = googleUser.email;
    const uid = googleUser.id;
    this.sharedService.uid = uid;

    console.log("UID from login" + this.sharedService.uid);
    
    await this.afs.collection('users').doc(uid).set({
      name: name,
      email: email,
      uid: uid
    });

    this.router.navigate(['/tabs/home']);
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }

  
}

  async refresh()
  {
    const authCode = await GoogleAuth.refresh();
    console.log('refresh: ', authCode);
  }
}

