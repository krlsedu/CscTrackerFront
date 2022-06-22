import {BarSerie} from "./barSerie";

export class BarDataSet {
  private _categories: string[];
  private _series: BarSerie[];


  constructor(categories: string[], series: BarSerie[]) {
    this._categories = categories;
    this._series = series;
  }

  get categories(): string[] {
    return this._categories;
  }

  set categories(value: string[]) {
    this._categories = value;
  }

  get series(): BarSerie[] {
    return this._series;
  }

  set series(value: BarSerie[]) {
    this._series = value;
  }
}
