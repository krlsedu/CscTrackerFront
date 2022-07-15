export class NotificationSync {
  private _text: string | undefined;
  private _type: string | undefined;
  private _date: Date | undefined;
  private _uuid: string | undefined;
  private _id: string | undefined;
  private _from: string | undefined;
  private _time: string | undefined;
  private _app: string | undefined;

  constructor() {
  }

  get text(): string {
    // @ts-ignore
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get type(): string {
    // @ts-ignore
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get date(): Date {
    // @ts-ignore
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get uuid(): string {
    // @ts-ignore
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get id(): string {
    // @ts-ignore
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get from(): string {
    // @ts-ignore
    return this._from;
  }

  set from(value: string) {
    this._from = value;
  }

  get time(): string {
    // @ts-ignore
    return this._time;
  }

  set time(value: string) {
    this._time = value;
  }

  get app(): string {
    // @ts-ignore
    return this._app;
  }

  set app(value: string) {
    this._app = value;
  }
}
