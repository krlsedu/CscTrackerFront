export class DataSet{
  private _label: string;
  private _value: number;
  groupedSums: any;

  constructor(label: string, value: number) {
    this._label = label;
    this._value = value;
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
