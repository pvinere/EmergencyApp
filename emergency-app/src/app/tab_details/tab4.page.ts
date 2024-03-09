import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { getDatabase,ref,set } from "firebase/database";
import { SharedService } from '../shared/service';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{
  @ViewChild(IonModal) modal: IonModal | undefined;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | undefined;


  constructor(public router: Router, 
    @Inject(SharedService)private sharedService: SharedService) {
    
  }
  ngOnInit(): void {
    this.checkAppMode();
  }

  
  darkMode = false;
  
  
   signOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['/first-page']);
    })

   }

  async checkAppMode() {
  
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    // console.log(checkIsDarkMode);
    // checkIsDarkMode == 'true'
    //   ? (this.darkMode = true)
    //   : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }
  toggleDarkMode()
  {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark',this.darkMode);
    if(this.darkMode){
      localStorage.setItem('darkModeActivated','true');
    }
    else
    {
      localStorage.setItem('darkModeActivated','false');
    }
  }

  

  changeName(name_change: any)
  {
    
      const db = getDatabase();
      set(ref(db, 'users/' + this.sharedService.uid), {
        name: name_change
      });
    
  }

  cancel() {
    if (this.modal) {
      this.modal.dismiss(null, 'cancel');
    } else {
      console.error("Modal is not initialized!");
    }
  }

  confirm() {
    if (this.modal){
      this.modal.dismiss(this.name, 'confirm');
    }
    else{
      console.error("Modal is not initialized!");
    }
    
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


}
