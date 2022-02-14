import { Component, Input } from '@angular/core';
import { ICinema } from 'src/interfaces';

@Component({
  selector: 'cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.scss']
})
export class CinemaListComponent {
  @Input() cityId: string = '';
  @Input() cinemas: ICinema[] = [];
  @Input() chosenCinemaId: string = '';

  constructor() { }
}
