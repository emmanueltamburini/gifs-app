import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _record: string[] = [];

  get record (): string[] {
    return [...this._record];
  }

  public searchGifs(query: string) {
    if (this.validateQuery(query)) return;

    this.insertRecord(query);

    console.log(this._record);
  }

  private validateQuery(query: string): boolean {
    return query.trim().length === 0;
  }

  private cutRecord(): void {
    this._record = this._record.splice(0, 10);
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
