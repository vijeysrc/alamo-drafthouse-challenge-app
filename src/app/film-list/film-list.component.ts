import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent {
  constructor(public ds:DataService) { }
}
