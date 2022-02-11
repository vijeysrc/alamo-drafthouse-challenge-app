import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { ICinema, IFilm, ISimpleFilmItem, ISession } from 'src/interfaces';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {
  cinemas: ICinema[] = [];
  films: IFilm[] = [];
  sessions: ISession[] = [];
  cityId: string = '';
  cinemaId: string = '';
  filmSlug: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) {
      this.router.events.subscribe(() => {
        this.updateWithParams();
      })
    }

  ngOnInit(): void {
    this.getCinemasByCity();
  }

  updateWithParams(): void {
    const cityId = this.route.snapshot.paramMap.get('cityId') as string;
    const cinemaId = this.route.snapshot.paramMap.get('cinemaId') as string;
    const filmSlug = this.route.snapshot.paramMap.get('filmSlug') as string;

    this.cityId = cityId;
    this.cinemaId = cinemaId;
    this.filmSlug = filmSlug;
  }

  getCinemasByCity(): void {
    this.dataService.getCinemas(this.cityId).subscribe(({cinemas, films, sessions}) => {
      this.cinemas = cinemas;
      this.films = films;
      this.sessions = sessions;
    })
  }

  getCinemaNameById(id: string): string {
    const cinema: undefined | ICinema = this.cinemas.find(cinema => cinema.id === id)
    if (cinema) return cinema.name
    return ""
  }

  getFilmNameByFilmSlug(slug: string): string {
    const film: undefined | IFilm = this.films.find(film => film.slug === slug)
    if (film) return film.title
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
    const items = this.sessions
      .filter(session => session.cinemaId === cinemaId && session.filmSlug === filmSlug)

    return items;
  }

}
