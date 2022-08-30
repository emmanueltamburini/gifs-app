import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../serivces/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent{

  @ViewChild('txtSearch')
  public txtSearch!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  public search() {
    const value = this.txtSearch.nativeElement.value;

    this.gifsService.searchGifs(value);

    this.txtSearch.nativeElement.value = '';
  }
}
