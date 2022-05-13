export class TimeLinePoint {
  private _x: string;
  private _y: number[];


  get x(): string {
    return this._x;
  }

  set x(value: string) {
    this._x = value;
  }

  get y(): number[] {
    return this._y;
  }

  set y(value: number[]) {
    this._y = value;
  }

  constructor(x: string, y: number[]) {
    this._x = x;
    this._y = y;
  }
}
