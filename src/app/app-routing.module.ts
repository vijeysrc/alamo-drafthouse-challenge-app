import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemasComponent } from './cinemas/cinemas.component';

const routes: Routes = [
  { path: ':cityId', component: CinemasComponent },
  { path: ':cityId/:cinemaId', component: CinemasComponent },
  { path: '', redirectTo: '/austin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
