import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ICinema, IFilm, ISession } from 'src/interfaces';

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

}
