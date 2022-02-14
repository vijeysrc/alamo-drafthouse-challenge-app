import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityDataResolver } from 'src/route.resolver';
import { CinemasComponent } from './cinemas/cinemas.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: ":cityId",
    component: CinemasComponent,
    resolve: {
      cityData: CityDataResolver,
    },
  },
  {
    path: ":cityId/:cinemaId",
    component: CinemasComponent,
    resolve: {
      cityData: CityDataResolver,
    },
  },
  {
    path: ":cityId/:cinemaId/:filmSlug",
    component: ShowComponent,
    resolve: {
      cityData: CityDataResolver,
    },
  },
  { path: "", redirectTo: "/austin", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
