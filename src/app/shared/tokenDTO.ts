export class TokenDTO {
  private _accessToken: string;
  private _refreshToken: string;
  private _expiresIn: number;


  constructor(accessToken: string, refreshToken: string, expiresIn: number) {
    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._expiresIn = expiresIn;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
  }

  get expiresIn(): number {
    return this._expiresIn;
  }

  set expiresIn(value: number) {
    this._expiresIn = value;
  }
}
