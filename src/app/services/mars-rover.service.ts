import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rover } from '../models/rover';
import { RoverApiParams } from '../models/roverApiParams';

@Injectable({
  providedIn: 'root',
})
export class MarsRoverService {
  private baseApi = 'https://api.nasa.gov/mars-photos/api/v1';

  constructor(private http: HttpClient) {}

  getMarsRovers() {
    return this.http
      .get<any>(`${this.baseApi}/rovers?&api_key=${environment.apiKey}`)
      .pipe(
        map((response) => {
          return response.rovers;
        })
      );
  }

  getMarsRoverPhotos(params: RoverApiParams) {
    const earthDate =
      params.earth_date == undefined ? '' : `&earth_date=${params.earth_date}`;

    const cameraName =
      params.cameraName == '' ? '' : `&camera=${params.cameraName}`;

    return this.http.get<any>(
      `${this.baseApi}/rovers/${params.roverName}/photos?api_key=${environment.apiKey}` +
        `${earthDate}${cameraName}&sol=${params.sol}` +
        ``
    );
  }
}
