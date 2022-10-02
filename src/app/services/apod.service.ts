import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApodService {
  private api_key = '9OtAH3sUNcMw9JDh9ejGjFcXrpd3jXBDpgtbudzy';

  constructor(private http: HttpClient) {}

  getAPOD() {
    return this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${this.api_key}`);
  }
}