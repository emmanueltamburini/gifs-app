import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MAX_RECORD_NUMBER } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _record: string[] = [];

  public results: any[] = [];

  private apikey: string = '3dbTtGps19hAG0pE4znv6a2FGJPI6klI';

  get record (): string[] {
    return [...this._record];
  }

  constructor (private http: HttpClient) {}

  public searchGifs(query: string) {
    if (this.validateQuery(query)) return;

    this.insertRecord(query);

    this.searchApi(query);

    console.log(this._record);
  }

  private searchApi(query: string) {
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=3dbTtGps19hAG0pE4znv6a2FGJPI6klI&q=${query}&limit=10`)
      .subscribe((response: any) => {
        console.log(response.data);
        this.results = response.data;
      });
  }

  private validateQuery(query: string): boolean {
    return query.trim().length === 0;
  }

  private cutRecord(): void {
    this._record = this._record.splice(0, MAX_RECORD_NUMBER );
  }

  private setFormatQuery(query: string): string {
    return query.trim().toLowerCase();
  }

  private insertRecord(query: string): void {
    const index = this._record.indexOf(query);
    const formatQuery = this.setFormatQuery(query);

    if (index !== -1) {
      this._record.splice(index, 1);
      this._record.unshift(formatQuery);
    } else {
      this._record.unshift(formatQuery);
      this.cutRecord();
    }
  }
}
