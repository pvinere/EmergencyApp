import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  isAdmin: boolean | undefined;
  email: string | undefined;
  password: string | undefined;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (result.user) {
        this.checkAdminRole(result.user.uid);
      }
    } catch (error) {
      console.error(error);
    }
  }

  checkAdminRole(uid: string) {
    this.db.collection('users').doc(uid).valueChanges().pipe(
      map((doc: any) => doc ? doc['role'] === 'isAdmin' : false)
    ).subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      if (isAdmin) {
        console.log("Admin Logged in successfully");
        this.router.navigate(['/admin-notification']);
      }
    });
  }
}
