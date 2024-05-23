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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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

    if(!isPlatform('android')) {
      GoogleAuth.initialize();
    }


    this.formRegLogin = new FormGroup({
      
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
     
    },
  
    );

    
  }

  ngOnInit(): void {
    GoogleAuth.initialize();

  }


  checkLoggedIn() {
    GoogleAuth.refresh().then((data) => {
      if (data.accessToken) {
        let navigationExtras: NavigationExtras = {
          state: {
            user: { type: 'existing', accessToken: data.accessToken, idToken: data.idToken }
          }
        };
        this.router.navigate(['/tab_home'], navigationExtras);
      }
    }).catch(e => {
      if (e.type === 'userLoggedOut') {
        this.doLogin();
      }
    });
  }

  async doLogin() {
    const user = await GoogleAuth.signIn();
    if (user) {
      this.goToHome(user);
    }
  
  
  }

  goToHome(user: User) {
    let navigationExtras: NavigationExtras = { state: { user: user } };
    this.router.navigate(['/tab_home'], navigationExtras);
  }

  async logIn(email: any, password: any) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
          const user = userCredential.user;
          this.sharedService.setUID(user.uid);
          console.log("User UID:", this.sharedService.uid);
          this.router.navigate(['/tabs/home']);
      }).catch((error)=>{
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
      });
    }
  

      // this.afAuth.authState.subscribe(user => {
      //   if (user) {
      //     const uid = user.uid;
  
      //     this.sharedService.setUID(uid);

      //     console.log("User UID:", this.sharedService.uid);
      //     this.router.navigate(['/tabs/home']);
      //   }
      // });
     
  


  
  
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Eroare',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  
}

signInGoogle(){
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
  .then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential !== null) {
      const token = credential.accessToken;
      
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
    
    const user = result.user;
    
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    
    const email = error.customData.email;
    
    const credential = GoogleAuthProvider.credentialFromError(error);

  });

}


async signInGoogle2() {
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

