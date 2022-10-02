import { Component, OnInit } from '@angular/core';
import { ApodService } from '../services/apod.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css'],
})
export class ApodComponent implements OnInit {
  apod: any;
  date = new Date();
  constructor(private apodService: ApodService) {}

  ngOnInit(): void {
    this.apodService.getAPOD().subscribe((response) => {
      this.apod = response;
    });
  }
}
