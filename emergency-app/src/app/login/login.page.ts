import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formRegLogin: FormGroup;


  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.formRegLogin = new FormGroup({
      
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
     
    },
  
    );
    
  }
  ngOnInit() {}
  logIn(email: any, password: any) {
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
        window.alert(error.message);
      });
  }
}
