import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/serivces/gifs.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html'
})
export class SiderbarComponent {

  constructor(private gifsService: GifsService) {}

  get record (): string[] {
    return this.gifsService.record;
  }

  public search(item: string) {
    this.gifsService.searchGifs(item);
  }
}
