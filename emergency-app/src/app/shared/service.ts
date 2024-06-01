// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  uid: string | undefined;
  darkMode: boolean = false;

  setUID(uid: string) {
    this.uid = uid;
    localStorage.setItem('uid', uid);
  }

  constructor() { 
    const storedUID = localStorage.getItem('uid');
    this.uid = storedUID !== null ? storedUID : undefined;

    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);

  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode); 

    
    localStorage.setItem('darkModeActivated', this.darkMode ? 'true' : 'false');
  }
}




