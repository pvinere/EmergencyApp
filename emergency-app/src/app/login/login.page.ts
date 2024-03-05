import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, isPlatform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formRegLogin: FormGroup;
  accountErrorMessage: string | undefined;
  userInfo = null;
 
  
  
  constructor(
    public authService: AuthenticationService,
    private alertController: AlertController,
    private afs: AngularFirestore,
    public router: Router
    

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

  ngOnInit() {}

  async logIn(email: any, password: any) {
    this.authService
      .SignIn(email.value, password.value)
      .then((): any => {
        // if (this.authService.isEmailVerified) {
        //   this.router.navigate(['/tabs/home']);
        // } else {
        //   window.alert('Email is not verified');
        //   return false;
        // }
          this.router.navigate(['/tabs/home']);
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.code) {
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


async signInGoogle() {
  try {
    const googleUser = await GoogleAuth.signIn() as any;
    console.log('user:', googleUser);
    this.userInfo = googleUser;

    // Define default values or handle undefined fields
    const name = googleUser.givenName;
    const email = googleUser.email;
    const uid = googleUser.id;

    console.log(name);

    // Add user info to Firestore
    await this.afs.collection('users').doc(googleUser.uid).set({
      name: name,
      email: email,
      uid: uid
    });

    this.router.navigate(['/tabs/home']);
  } catch (error) {
    console.error('Error signing in with Google:', error);
    // Handle error
  }
}



  async refresh()
  {
    const authCode = await GoogleAuth.refresh();
    console.log('refresh: ', authCode);
  }
}

