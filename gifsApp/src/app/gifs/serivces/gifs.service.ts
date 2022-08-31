import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MAX_RECORD_NUMBER } from '../constant/constant';
import { Gif, GifsInterface } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _record: string[] = [];

  private _results: Gif[] = [];

  private apikey: string = '3dbTtGps19hAG0pE4znv6a2FGJPI6klI';

  get record (): string[] {
    return [...this._record];
  }

  get results (): Gif[] {
    return [...this._results];
  }

  constructor (private http: HttpClient) {
    this.loadLocalStorage();
  }

  public searchGifs(query: string) {
    if (this.validateQuery(query)) return;

    this.insertRecord(query);

    this.searchApi(query);

    this.saveLocalRecordStorage();

    console.log(this._record);
  }

  private loadLocalStorage(): void {
    const localStorageRecord: string | null = localStorage.getItem('record');
    const localStorageResults: string | null = localStorage.getItem('results');

    if (localStorageRecord) {
      this._record = JSON.parse(localStorageRecord);
    }

    if (localStorageResults) {
      this._results = JSON.parse(localStorageResults);
    }
  }

  private saveLocalRecordStorage(): void {
    localStorage.setItem('record', JSON.stringify(this._record));
  }

  private saveLocalResultsStorage(): void {
    localStorage.setItem('results', JSON.stringify(this._results));
  }

  private searchApi(query: string): void{
    this.http.get<GifsInterface>(`https://api.giphy.com/v1/gifs/search?api_key=3dbTtGps19hAG0pE4znv6a2FGJPI6klI&q=${query}&limit=10`)
      .subscribe((response: GifsInterface) => {
        console.log(response);
        this._results = response.data;
        this.saveLocalResultsStorage();
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
