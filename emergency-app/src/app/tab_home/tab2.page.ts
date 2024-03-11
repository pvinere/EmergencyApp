import { Component, Inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from '../shared/authentication-service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SharedService } from '../shared/service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  userName$: Observable<string> | undefined;
  

  constructor(
    public authService: AuthenticationService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    @Inject(SharedService)private sharedService: SharedService
  ) 
  { }

 

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid =user.uid;
        console.log("UID from tab2Home: " + this.sharedService.uid);
        localStorage.setItem('uid', uid); 
        this.sharedService.uid = uid;
        this.userName$ = this.afs.doc<any>(`users/${uid}`).valueChanges().pipe(
          map(userData => {
            
            if (userData) {
              return userData.name;
            } else {
              
              return 'Unknown'; 
              
            }
          })
        );
      }
    });

}

}
