import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit{

  constructor() {}
  ngOnInit(): void {
    this.checkAppMode();
  }

  darkMode = false;

  async checkAppMode() {
  
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    console.log(checkIsDarkMode);
    checkIsDarkMode == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
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

}
