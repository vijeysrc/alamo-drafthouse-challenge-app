import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location) { }

  ngOnInit(): void {
    this.getCinemasByCity()
  }

  getCinemasByCity(): void {
    const cityId = this.route.snapshot.paramMap.get('cityId') as string;
    this.dataService.getCinemas(cityId).subscribe(({cinemas, films}) => {
      this.cinemas = cinemas;
      this.films = films;
    })
  }

}
