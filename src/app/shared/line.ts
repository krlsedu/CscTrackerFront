export class Line{
  private _type: string;
  private _boxId: string;
  private _boxIdSecond: string;

  constructor(type: string, boxId: string, boxIdSecond: string ='') {
    this._type = type;
    this._boxId = boxId;
    this._boxIdSecond = boxIdSecond;
  }


  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get boxId(): string {
    return this._boxId;
  }

  set boxId(value: string) {
    this._boxId = value;
  }

  get boxIdSecond(): string {
    return this._boxIdSecond;
  }

  set boxIdSecond(value: string) {
    this._boxIdSecond = value;
  }
}
