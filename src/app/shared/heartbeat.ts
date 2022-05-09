export class Heartbeat {
  private _entity: string;
  private _process: string;
  private _applicationName: string;
  private _entityType: string;
  private _timestamp: number;
  private _write: boolean;
  private _project: string;
  private _language: string;
  private _category: string;
  private _ideName: string;
  private _ideVersion: string;
  private _hostName: string;
  private _osName: string;
  private _timeSpentMillis: number;
  private _timeSpentMillisNoConflict: number;
  private _dateTime: Date;
  private _dateTimeEnd: Date;
  private _sent: boolean;
  private _domain: string;

  constructor(entity: string, process: string, applicationName: string, entityType: string, timestamp: number, write: boolean, project: string, language: string, category: string, ideName: string, ideVersion: string, hostName: string, osName: string, timeSpentMillis: number, timeSpentMillisNoConflict: number, dateTime: Date, dateTimeEnd: Date, sent: boolean, domain: string) {
    this._entity = entity;
    this._process = process;
    this._applicationName = applicationName;
    this._entityType = entityType;
    this._timestamp = timestamp;
    this._write = write;
    this._project = project;
    this._language = language;
    this._category = category;
    this._ideName = ideName;
    this._ideVersion = ideVersion;
    this._hostName = hostName;
    this._osName = osName;
    this._timeSpentMillis = timeSpentMillis;
    this._timeSpentMillisNoConflict = timeSpentMillisNoConflict;
    this._dateTime = dateTime;
    this._dateTimeEnd = dateTimeEnd;
    this._sent = sent;
    this._domain = domain;
  }


  get entity(): string {
    return this._entity;
  }

  set entity(value: string) {
    this._entity = value;
  }

  get process(): string {
    return this._process;
  }

  set process(value: string) {
    this._process = value;
  }

  get applicationName(): string {
    return this._applicationName;
  }

  set applicationName(value: string) {
    this._applicationName = value;
  }

  get entityType(): string {
    return this._entityType;
  }

  set entityType(value: string) {
    this._entityType = value;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  set timestamp(value: number) {
    this._timestamp = value;
  }

  get write(): boolean {
    return this._write;
  }

  set write(value: boolean) {
    this._write = value;
  }

  get project(): string {
    return this._project;
  }

  set project(value: string) {
    this._project = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get ideName(): string {
    return this._ideName;
  }

  set ideName(value: string) {
    this._ideName = value;
  }

  get ideVersion(): string {
    return this._ideVersion;
  }

  set ideVersion(value: string) {
    this._ideVersion = value;
  }

  get hostName(): string {
    return this._hostName;
  }

  set hostName(value: string) {
    this._hostName = value;
  }

  get osName(): string {
    return this._osName;
  }

  set osName(value: string) {
    this._osName = value;
  }

  get timeSpentMillis(): number {
    return this._timeSpentMillis;
  }

  set timeSpentMillis(value: number) {
    this._timeSpentMillis = value;
  }

  get timeSpentMillisNoConflict(): number {
    return this._timeSpentMillisNoConflict;
  }

  set timeSpentMillisNoConflict(value: number) {
    this._timeSpentMillisNoConflict = value;
  }

  get dateTime(): Date {
    return this._dateTime;
  }

  set dateTime(value: Date) {
    this._dateTime = value;
  }

  get dateTimeEnd(): Date {
    return this._dateTimeEnd;
  }

  set dateTimeEnd(value: Date) {
    this._dateTimeEnd = value;
  }

  get sent(): boolean {
    return this._sent;
  }

  set sent(value: boolean) {
    this._sent = value;
  }

  get domain(): string {
    return this._domain;
  }

  set domain(value: string) {
    this._domain = value;
  }
}
