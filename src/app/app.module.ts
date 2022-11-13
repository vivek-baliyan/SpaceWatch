import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { HeroCarouselComponent } from './core/hero-carousel/hero-carousel.component';
import { ApodComponent } from './apod/apod.component';
import { MarsRoverComponent } from './mars-rover/mars-rover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    HeroCarouselComponent,
    ApodComponent,
    MarsRoverComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PopoverModule.forRoot(),
    PaginationModule.forRoot(),
    GalleryModule,
    LightboxModule.withConfig({ keyboardShortcuts: false }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
