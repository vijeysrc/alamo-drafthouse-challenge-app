import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  ICinema,
  ICity,
  ICityResponse,
  IFilm,
  ISession
} from '../interfaces'

const getBaseUrl = (city: String) => '/assets/data/mock.json' // `https://drafthouse.com/s/mother/v1/page/market/main/${city}`

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cityId: string = '';
  cinemaId: string = '';
  filmSlug: string = '';

  cinemas: ICinema[] = [];
  films: IFilm[] = [];
  sessions: ISession[] = [];

  constructor(private http: HttpClient) { }

  setCityId(cityId: string) {
    this.cityId = cityId
  }

  setCinemaId(cinemaId: string = '') {
    this.cinemaId = cinemaId
  }

  setFilmSlug(filmSlug: string = '') {
    this.filmSlug = filmSlug;
  }

  setupCityData(cityId: string, cinemaId: string, filmSlug: string): void {
    if (this.cityId !== cityId) {
      this.getCityData().subscribe(res => this.updateCityData(res));
    }
    this.setCityId(cityId);
    this.setCinemaId(cinemaId);
    this.setFilmSlug(filmSlug);
  }

  updateCityData(res: ICityResponse): void {
    const { data } = res as ICityResponse;
    const { market, films, sessions} = data;
    const { cinemas } = market;

    this.cinemas = cinemas;
    this.films = films;
    this.sessions = sessions;
  }

  getCityData(): Observable<any> {
    const url = getBaseUrl(this.cityId)
    return this.http.get(url, httpOptions)
  }

  getCinemas(): Observable<ICity> {
    const url = getBaseUrl(this.cityId)
    return this.http.get(url, httpOptions).pipe(map(res => {
      const { data } = res as ICityResponse
      const { market, films, sessions} = data
      const { cinemas } = market

      return {
        cinemas,
        films,
        sessions
      }
    }))
  }
}
