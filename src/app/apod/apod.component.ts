import { Component, OnInit } from '@angular/core';
import {
  Gallery,
  GalleryItem,
  GalleryRef,
  ImageItem,
  ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
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
  lightboxRef: GalleryRef;

  constructor(
    private apodService: ApodService,
    private gallery: Gallery,
    private lightbox: Lightbox
  ) {}

  ngOnInit(): void {
    this.lightboxRef = this.gallery.ref(this.galleryId);
    this.lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
      thumb: false,
      counter: false,
    });

    this.lightbox.setConfig({ panelClass: 'g-overlay' });

    this.getApod(this.getNowUTC());
  }

  getApod(date: Date, isNext = false) {
    this.apodService.getApod(date).subscribe((response: Apod) => {
      if (response.media_type !== 'image') {
        if (isNext) date.setDate(date.getDate() + 1);
        else date.setDate(date.getDate() - 1);
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

  previousApod() {
    let date = new Date(this.apod.date);
    date.setDate(date.getDate() - 1);
    this.getApod(date);
  }

  nextApod() {
    let date = new Date(this.apod.date);
    if (date.getDate() === this.getNowUTC().getDate()) {
      alert('Apod not availabe for next data');
      return;
    }

    date.setDate(date.getDate() + 1);
    this.getApod(date, true);
  }

  getNowUTC() {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  }
}
