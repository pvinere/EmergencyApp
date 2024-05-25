import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  notifications: any[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore.collection('notifications').valueChanges().subscribe(data => {
      this.notifications = data;
    });
  }
}