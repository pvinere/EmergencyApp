import { Component, Inject, OnInit } from '@angular/core';
import { SharedService } from '../shared/service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.page.html',
  styleUrls: ['./first-page.page.scss'],
})
export class FirstPagePage implements OnInit {

  constructor( @Inject(SharedService)private sharedService: SharedService) { }

  ngOnInit() {
    
  }
  
  
}
