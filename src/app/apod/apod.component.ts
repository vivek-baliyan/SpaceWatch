import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ImageSize } from 'ng-gallery';
import { Apod } from '../models/apod';
import { ApodService } from '../services/apod.service';

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css'],
})
export class ApodComponent implements OnInit {
  apod: Apod;

  items: GalleryItem[];
  galleryId = 'apod';
  lightboxRef = this.gallery.ref(this.galleryId);

  constructor(private apodService: ApodService, private gallery: Gallery) {}

  ngOnInit(): void {
    this.getApod(this.getNowUTC());

    this.lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumb: false,
      counter: false,
    });
  }

  getApod(date: Date) {
    this.apodService.getApod(date).subscribe((response: Apod) => {
      if (response.media_type !== 'image') {
        date.setDate(date.getDate() - 1);
        return this.getApod(date);
      }
      this.apod = response;
      this.items = [
        new ImageItem({
          src: this.apod.hdurl,
          thumb: this.apod.url,
        }),
      ];
      this.lightboxRef.load(this.items);
    });
  }

  getNowUTC() {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  }
}
