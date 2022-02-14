import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  constructor(public ds: DataService) { }
}
