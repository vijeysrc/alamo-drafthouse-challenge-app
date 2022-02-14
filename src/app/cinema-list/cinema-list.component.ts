import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'cinema-list',
  templateUrl: './cinema-list.component.html',
  styleUrls: ['./cinema-list.component.scss']
})
export class CinemaListComponent {
  constructor(public ds: DataService) {}
}
