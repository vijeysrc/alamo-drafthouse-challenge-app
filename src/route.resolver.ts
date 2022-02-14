import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { DataService } from './app/data.service';

@Injectable()
export class CityDataResolver implements Resolve<any> {
  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const { cityId, cinemaId, filmSlug } = route.params;

    return this.dataService.setupCityData(cityId, cinemaId, filmSlug);
  }
}
