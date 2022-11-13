import { Component, OnInit } from '@angular/core';
import { ApodService } from 'src/app/services/apod.service';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.css'],
})
export class HeroCarouselComponent implements OnInit {
  carousels: any = [
    {
      title: '“Cosmic Cliffs” in the Carina Nebula',
      camera: 'NIRCam Image',
      path: '../../../assets/carousel_images/CosmicCliffs.png',
    },
    {
      title: 'Southern Ring Nebula',
      camera: 'NIRCam Image',
      path: '../../../assets/carousel_images/SouthernRingNebula.png',
    },
    {
      title: 'Tarantula Nebula',
      camera: 'NIRCam Image',
      path: '../../../assets/carousel_images/TarantulaNebula.png',
    },
  ];
  activeIndex = 0;
  constructor(private apodService: ApodService) {}

  ngOnInit(): void {
    setInterval(() => this.changeCarousel('n'), 5000);
  }

  changeCarousel(slide: string) {
    switch (slide) {
      case 'p':
        this.activeIndex =
          this.activeIndex == 0
            ? this.carousels.length - 1
            : this.activeIndex - 1;
        break;
      case 'n':
        this.activeIndex =
          this.activeIndex == this.carousels.length - 1
            ? 0
            : this.activeIndex + 1;
        break;
      default:
        this.activeIndex = 0;
        break;
    }
  }

  changeIndicator(index: number) {
    this.activeIndex = index;
  }
}
