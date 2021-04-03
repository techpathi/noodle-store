import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailService } from '../detail.service';
import { Noodle } from '../model/noodle';
import { NoodleService } from '../noodle.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  allNoodles: Noodle[] = [];
  allNoodleImages: string[] = [];
  imagesToDisplay: string[] = [];
  allNoodlesJson: any;
  searchTerm: string = "";
  errorMessage: string;
  thisNoodle: Noodle;
  
  constructor(private noodleService: NoodleService, private detailService: DetailService) { }

  ngOnInit(): void {
    this.getAllNoodles();
    this.getAllNoodleImages();
  }

  getAllNoodleImages() {
    this.noodleService.getAllNoodleImages().subscribe(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          this.allNoodleImages.push(data[i]["Image"]);
        }
      },
      (error) => { this.errorMessage = error },
      () => {
        this.generateNoodleImagesToDisplay();
      }
    );
  }

  getAllNoodles() {
    this.noodleService.getAllNoodles().subscribe(
      (data) => { this.allNoodlesJson = data },
      (error) => { this.errorMessage = error },
      () => {
        this.bindUtility();
      }
    );
    console.log(this.allNoodleImages);
  }

  bindUtility() {

    for (var i = 0; i < this.allNoodlesJson.length; i++) {
      let brand = this.allNoodlesJson[i]["Brand"];
      let variety = this.allNoodlesJson[i]["Variety"];
      let country = this.allNoodlesJson[i]["Country"];
      let style = this.allNoodlesJson[i]["Style"];
      let stars = this.allNoodlesJson[i]["Stars"];
      let topTen = this.allNoodlesJson[i]["Top Ten"];
      let newNoodle = new Noodle(brand, variety, style, country, stars, topTen);
      this.allNoodles.push(newNoodle);
    }
  }

  generateNoodleImagesToDisplay() {
    for (var i = 0; i < this.allNoodles.length; i++) {
      this.imagesToDisplay.push(this.allNoodleImages[Math.floor(Math.random() * this.allNoodleImages.length)]);
    }
    console.log(this.imagesToDisplay)
  }

  getRandomNoodleImage() {
    return this.allNoodleImages[Math.floor(Math.random() * this.allNoodleImages.length)];
  }

  setThisNoodleData(noodle: Noodle) {
    this.thisNoodle = noodle;
  }

  sortNoodlesAscending() {
    console.log("Sort ascending")
    this.allNoodles.sort(function (a, b) {
      if (a.Stars < b.Stars) return 1;
      if (a.Stars > b.Stars) return -1;
      return 0;
    });
  }

  sortNoodlesDescending() {
    console.log("Sort descending")
    this.allNoodles.sort(function (a, b) {
      if (a.Stars > b.Stars) return 1;
      if (a.Stars < b.Stars) return -1;
      return 0;
    });
  }

  sortByRating(value: number) {
    switch (value) {
      case 0:
        console.log("None sorting");
      case 1:
        this.sortNoodlesAscending();
        break;
      case 5:
        this.sortNoodlesDescending();
        break;

    }
  }

  ngOnDestroy(): void {
    this.detailService.setNoodleDetails(this.thisNoodle, this.getRandomNoodleImage());
  }

}