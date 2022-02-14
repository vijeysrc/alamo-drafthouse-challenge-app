import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlamoHeaderComponent } from './alamo-header/alamo-header.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { CinemaListComponent } from './cinema-list/cinema-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AlamoHeaderComponent,
    CinemasComponent,
    CinemaListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
