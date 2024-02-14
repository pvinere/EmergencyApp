import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {
  
formReg: FormGroup;

  constructor(
    public authService: AuthenticationService,
    public router: Router
    
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
  signUp(email: any, password: any) {
    this.authService
      .RegisterUser(email.value, password.value)
      .then((res) => {
        this.router.navigate(['/tabs/home']);
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
