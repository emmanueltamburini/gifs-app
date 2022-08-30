import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{

  @ViewChild('txtSearch')
  public txtSearch!: ElementRef<HTMLInputElement>;

  public search() {
    const value = this.txtSearch.nativeElement.value;
    console.log(value);

    this.txtSearch.nativeElement.value = '';
  }
}
