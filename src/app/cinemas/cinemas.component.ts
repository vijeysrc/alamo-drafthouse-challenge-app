import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { ICinema, IFilm, ISimpleFilmItem, ISession } from 'src/interfaces';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent{
  cinemas: ICinema[] = [];
  films: IFilm[] = [];
  sessions: ISession[] = [];
  cityId: string = '';
  cinemaId: string = '';
  filmSlug: string = '';

  constructor(public dataService: DataService) {}

  getCinemaNameById(id: string): string {
    const cinema: undefined | ICinema = this.cinemas.find(cinema => cinema.id === id)
    if (cinema) return cinema.name
    return ""
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

}
