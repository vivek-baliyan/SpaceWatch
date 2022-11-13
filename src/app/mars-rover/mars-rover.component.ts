import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, GalleryRef, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Rover } from '../models/rover';
import { RoverApiParams } from '../models/roverApiParams';
import { RoverCamera } from '../models/roverCamera';
import { RoverPhoto } from '../models/roverPhoto';
import { MarsRoverService } from '../services/mars-rover.service';

@Component({
  selector: 'app-mars-rover',
  templateUrl: './mars-rover.component.html',
  styleUrls: ['./mars-rover.component.css'],
})
export class MarsRoverComponent implements OnInit {
  photos: RoverPhoto[];
  paginatedPhotos: RoverPhoto[];
  rovers: Rover[];
  cameras: RoverCamera[];

  items: GalleryItem[];
  galleryId = 'mars';
  lightboxRef: GalleryRef;

  html: string;
  currentPage = 1;

  constructor(
    private marsRoverService: MarsRoverService,
    private gallery: Gallery,
    private lightbox: Lightbox
  ) {}

  ngOnInit(): void {
    this.lightboxRef = this.gallery.ref(this.galleryId);

    this.lightboxRef.setConfig({
      thumbPosition: 'top',
      thumbView: 'contain',
    });

    this.lightbox.setConfig({ panelClass: 'fullscreen' });

    this.getMarsRovers();
  }

  getMarsRovers() {
    this.marsRoverService.getMarsRovers().subscribe((response: Rover[]) => {
      this.rovers = response;
      this.roverSelected(response[0].id);
    });
  }

  getMarsRoverPhotos(params: RoverApiParams) {
    this.marsRoverService.getMarsRoverPhotos(params).subscribe((response) => {
      this.currentPage = 1;
      this.photos = response.photos;
      this.paginatedPhotos = this.photos.slice(0, 10);
      this.loadLightboxItems();
    });
  }

  roverSelected(roverId: number) {
    let rover = this.rovers.find((r) => r.id == roverId);
    this.cameras = rover.cameras;

    this.html =
      `<div><table>` +
      `<tr><td>Name: ${rover.name}</td></tr>` +
      `<tr><td>Landing Date: ${rover.landing_date}</td></tr>` +
      `<tr><td>Launch Date: ${rover.launch_date}</td></tr>` +
      `<tr><td>Status: ${rover.status}</td></tr>` +
      `<tr><td>Max Date: ${rover.max_date}</td></tr>` +
      `<tr><td>Max Sol: ${rover.max_sol}</td></tr>` +
      `<tr><td>Total Photos: ${rover.total_photos}</td></tr>` +
      `</div>`;
  }

  searchPhotos(roverId: number, cameraId: number, sol: number) {
    let rover = this.rovers.find((r) => r.id == roverId);
    let cameraName = '';
    if (cameraId > 0) cameraName = rover.cameras.find((c) => c.id == cameraId).name;

    let params: RoverApiParams = {
      roverName: rover.name.toLowerCase(),
      cameraName: cameraName.toLowerCase(),
      sol: sol,
    };
    this.getMarsRoverPhotos(params);
  }

  loadLightboxItems(){
    this.items = this.paginatedPhotos.map(
      (photo) => new ImageItem({ src: photo.img_src, thumb: photo.img_src })
    );

    this.lightboxRef.load(this.items);
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginatedPhotos = this.photos.slice(startItem, endItem);
    this.loadLightboxItems();
  }
}
