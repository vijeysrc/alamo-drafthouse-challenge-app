import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent{
  constructor(public ds: DataService) {}
}
