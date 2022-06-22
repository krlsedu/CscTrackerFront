export class BarSerie{
  private _name: string;
  private _data: number[];

  constructor(name: string, data: number[]) {
    this._name = name;
    this._data = data;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get data(): number[] {
    return this._data;
  }

  set data(value: number[]) {
    this._data = value;
  }
}
