// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  uid: string | undefined;

  setUID(uid: string) {
    this.uid = uid;
    localStorage.setItem('uid', uid);
  }

  constructor() { 
    const storedUID = localStorage.getItem('uid');
    this.uid = storedUID !== null ? storedUID : undefined;
  }
}
