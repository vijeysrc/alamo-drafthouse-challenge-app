import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlamoHeaderComponent } from './alamo-header/alamo-header.component';
import { CinemasComponent } from './cinemas/cinemas.component';

@NgModule({
  declarations: [
    AppComponent,
    AlamoHeaderComponent,
    CinemasComponent
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
