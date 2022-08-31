import { Component } from '@angular/core';
import { GifsService } from '../serivces/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  constructor(private gifsService: GifsService) {}

  get results() {
    return this.gifsService.results;
  }

}
