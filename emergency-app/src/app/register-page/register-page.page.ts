import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {
  
formReg: FormGroup;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private afs: AngularFirestore
    
  ) {
    this.formReg = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)],),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators : this.passwordMatchValidator
    }
    );
    
  }

  ngOnInit() {
  
  }
  signUp(email: any, password: any, name: any) {
    this.authService
      .RegisterUser(email.value, password.value)
      .then((res) => {
        if (res && res.user) {
          const uid = res.user.uid;
          this.afs.collection('users').doc(uid).set({
            name: name.value,
            email: email.value,
            uid: uid
          });
          this.router.navigate(['/tabs/home']);
        } else {
          // Handle the case where res.user is null
          console.error("User data not available");
        }
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  
  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  get passwordFormField() {
  
    return this.formReg.get('password');
  
  }

 
}
