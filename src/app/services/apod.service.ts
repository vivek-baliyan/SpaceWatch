import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Apod } from '../models/apod';

@Injectable({
  providedIn: 'root',
})
export class ApodService {
  private api_url = `https://api.nasa.gov/planetary/apod?api_key=${environment.apiKey}`;
  private pipe = new DatePipe('en-US');

  constructor(private http: HttpClient) {}

  getApod(date: Date) {
    return this.http
      .get<Apod>(
        this.api_url + '&date=' + this.pipe.transform(date, 'YYYY-MM-dd')
      )
      .pipe(
        catchError((err) => {
          date.setDate(date.getDate() - 1);
          return this.getApod(date);
        })
      );
  }
}
