import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MAX_RECORD_NUMBER, LIMIT_PARAMETER, API_KEY, LIMIT, Q, RESULTS, RECORD } from '../constant/constant';
import { Gif, GifsInterface } from '../interfaces/gifs.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _record: string[] = [];

  private _results: Gif[] = [];

  private _apikey: string = environment.apikey;

  private _urlService = 'https://api.giphy.com/v1/gifs';

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
  }

  private loadLocalStorage(): void {
    const localStorageRecord: string | null = localStorage.getItem(RECORD);
    const localStorageResults: string | null = localStorage.getItem(RESULTS);

    if (localStorageRecord) {
      this._record = JSON.parse(localStorageRecord);
    }

    if (localStorageResults) {
      this._results = JSON.parse(localStorageResults);
    }
  }

  private saveLocalRecordStorage(): void {
    localStorage.setItem(RECORD, JSON.stringify(this._record));
  }

  private saveLocalResultsStorage(): void {
    localStorage.setItem(RESULTS, JSON.stringify(this._results));
  }

  private searchApi(query: string): void{
    const params = new HttpParams()
      .set(API_KEY, this._apikey)
      .set(LIMIT, LIMIT_PARAMETER)
      .set(Q, query)

    this.http.get<GifsInterface>(`${this._urlService}/search`, { params })
      .subscribe((response: GifsInterface) => {
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
