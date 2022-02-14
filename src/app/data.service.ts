import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  ICinema,
  ICity,
  ICityResponse,
  IFilm,
  ISession,
  ISimpleFilmItem
} from '../interfaces'

const getBaseUrl = (city: String) => `https://drafthouse.com/s/mother/v1/page/market/main/${city}`

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

  isLoading: boolean = true;

  constructor(private http: HttpClient) { }

  setCityId(cityId: string) {
    this.cityId = cityId;
  }

  setCinemaId(cinemaId: string = '') {
    this.cinemaId = cinemaId;
  }

  setFilmSlug(filmSlug: string = '') {
    this.filmSlug = filmSlug;
  }

  setupCityData(cityId: string, cinemaId: string, filmSlug: string): void {
    if (this.cityId !== cityId) {
      this.setCityId(cityId);
      this.isLoading = true;
      this.getCityData().subscribe(res => this.updateCityData(res));
    }
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

    this.isLoading = false;
  }

  getCityData(): Observable<any> {
    const url = getBaseUrl(this.cityId)
    return this.http.get(url, httpOptions)
  }

  getCinemaNameById(id: string): string {
    const cinema: undefined | ICinema = this.cinemas.find(cinema => cinema.id === id)
    if (cinema) return cinema.name
    return ""
  }

  getFilmsByCinemaId(cinemaId: string): any[] {
    const {films } = this.sessions
      .filter(session => session.cinemaId === cinemaId)
      .map(item => ({filmName: item.filmName, filmSlug: item.filmSlug}))
      .sort(function (x, y){
        if (x.filmSlug < y.filmSlug) {return -1;}
        if (x.filmSlug > y.filmSlug) {return 1;}
        return 0;
      })
      .reduce(
        (acc, curr) => {
          const {temp, films} = acc;
          const {filmName, filmSlug} = curr;

          if (temp[filmSlug]) {
            return ({temp, films});
          } else {
            temp[filmSlug] = filmName;
            return ({
              temp,
              films: [...films, {filmName, filmSlug}]
            })
          }
        },
        {temp: {}, films: []} as {temp: any; films: ISimpleFilmItem[] }
      )

    return films;
  }

  getFilmByFilmSlug(slug: string): IFilm | undefined {
    const film = this.films.find(film => film.slug === slug)
    if (film) return film
    return undefined
  }

  getFilmNameByFilmSlug(slug: string): string {
    const film: undefined | IFilm = this.getFilmByFilmSlug(slug)
    if (film) return film.title
    return ""
  }

  getFilmImageByFilmSlug(slug: string): string {
    const film: undefined | IFilm = this.getFilmByFilmSlug(slug)
    if (film) return film.landscapeHeroImage
    return ""
  }

  getSessionByCinemaIdFilmSlug(cinemaId: string, filmSlug: string): any[] {
    const {dates, aggr} = this.sessions
      .filter(session => session.cinemaId === cinemaId && session.filmSlug === filmSlug)
      .reduce((acc, curr) => {
        const { businessDateClt } = curr as ISession;
        const { dates, aggr} = acc
        if (!aggr[businessDateClt]) {
          aggr[businessDateClt] = []
          dates.push(businessDateClt)
        }
        return {
          dates,
          aggr: {
            ...aggr,
            [businessDateClt]: [...aggr[businessDateClt], curr]
          }

        }

      }, {dates: [], aggr: {}} as Record<any, any>)

    const readable = (dateStr: string) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }

    const items = dates.map((date: string) => ({businessDateClt: readable(date), data: aggr[date]}))

    return items;
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
