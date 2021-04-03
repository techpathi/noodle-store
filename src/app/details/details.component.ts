import { Component, OnInit } from '@angular/core';
import { DetailService } from '../detail.service';
import { Noodle } from '../model/noodle';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  noodle: Noodle;
  image: string;

  constructor(private detailService: DetailService) { }

  ngOnInit(): void {
    this.noodle = this.detailService.getNoodleDetails();
    this.image = this.detailService.getNoodleImage();
  }

}
