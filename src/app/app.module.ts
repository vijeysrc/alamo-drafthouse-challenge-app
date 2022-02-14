import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlamoHeaderComponent } from './alamo-header/alamo-header.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { CinemaListComponent } from './cinema-list/cinema-list.component';
import { CityDataResolver } from 'src/route.resolver';
import { FilmListComponent } from './film-list/film-list.component';
import { ShowComponent } from './show/show.component';
import { IsLoadingComponent } from './is-loading/is-loading.component';

@NgModule({
  declarations: [
    AppComponent,
    AlamoHeaderComponent,
    CinemasComponent,
    CinemaListComponent,
    FilmListComponent,
    ShowComponent,
    IsLoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CityDataResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
