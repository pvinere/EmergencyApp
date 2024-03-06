// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  uid: string | undefined;

  setUID(uid: string) {
    this.uid = uid;
  }

  constructor() { }
}
