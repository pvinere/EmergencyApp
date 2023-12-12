import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

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

}
