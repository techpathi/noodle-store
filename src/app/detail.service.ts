import { Injectable } from '@angular/core';
import { Noodle } from './model/noodle';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  thisNoodle: Noodle;
  image: string;

  constructor() { }

  getNoodleDetails() {
    return this.thisNoodle;
  }

  getNoodleImage() {
    return this.image;
  }

  setNoodleDetails(noodle: Noodle, image: string) {
    this.thisNoodle = noodle;
    this.image = image;

  }
}
