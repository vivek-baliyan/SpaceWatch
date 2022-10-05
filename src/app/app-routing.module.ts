import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApodComponent } from './apod/apod.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'apod', component: ApodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
