import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formRegLogin: FormGroup;
  accountErrorMessage: string | undefined;
  
  
  constructor(
    public authService: AuthenticationService,
    private alertController: AlertController,
    public router: Router
  ) {
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
          case 'auth/invalid-login-credentials':
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
}

