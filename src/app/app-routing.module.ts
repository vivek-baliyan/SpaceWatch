import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApodComponent } from './apod/apod.component';
import { HomeComponent } from './home/home.component';
import { MarsRoverComponent } from './mars-rover/mars-rover.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'apod', component: ApodComponent },
  { path: 'mars', component: MarsRoverComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
