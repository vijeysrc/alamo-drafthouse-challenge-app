import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from '../data.service';
import { ICinema, IFilm } from 'src/interfaces';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit {
  cinemas: ICinema[] = [];
  films: IFilm[] = [];
  cityId: string = '';
  cinemaId: string = '';

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

    this.cityId = cityId;
    this.cinemaId = cinemaId;
  }

  getCinemasByCity(): void {
    this.dataService.getCinemas(this.cityId).subscribe(({cinemas, films}) => {
      this.cinemas = cinemas;
      this.films = films;
    })
  }

  getCinemaNameById(id: string): string {
    const cinema: undefined | ICinema = this.cinemas.find(cinema => cinema.id === id)
    if (cinema) return cinema.name
    return ""
  }

}
