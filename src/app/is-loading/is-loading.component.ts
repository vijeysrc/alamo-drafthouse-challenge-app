import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'is-loading',
  templateUrl: './is-loading.component.html',
  styleUrls: ['./is-loading.component.scss']
})
export class IsLoadingComponent {
  constructor(public ds: DataService) { }
}
