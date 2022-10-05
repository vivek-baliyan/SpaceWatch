import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs';
import { Apod } from '../models/apod';

@Injectable({
  providedIn: 'root',
})
export class ApodService {
  private api_key = '9OtAH3sUNcMw9JDh9ejGjFcXrpd3jXBDpgtbudzy';
  private pipe = new DatePipe('en-US');

  constructor(private http: HttpClient) {}

  getAPOD(date: Date) {
    return this.http.get<Apod>(
      'https://api.nasa.gov/planetary/apod?api_key=' +
        this.api_key +
        '&date=' +
        this.pipe.transform(date, 'YYYY-MM-dd')
    );
  }
}
