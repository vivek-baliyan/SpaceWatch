import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Apod } from '../models/apod';
import { ApodService } from '../services/apod.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css'],
})
export class ApodComponent implements OnInit {
  apod: Apod;
  date = new Date();
  constructor(private apodService: ApodService) {}

  ngOnInit(): void {
    this.getApod(new Date());
  }

  getApod(date: Date) {
    this.apodService.getAPOD(date).subscribe((response) => {
      if (response.media_type !== 'image') {
        date.setDate(date.getDate() - 1);
        this.getApod(date);
      } else this.apod = response;
    });
  }
}
