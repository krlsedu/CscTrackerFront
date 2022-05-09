import {TokenDTO} from "./tokenDTO";

export class UserDTO {
  private _id: number;
  private _email: string;
  private _password: string;
  private _type: string;
  private _token: TokenDTO;

  constructor(id: number, email: string, password: string, type: string, token: TokenDTO) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._type = type;
    this._token = token;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get token(): TokenDTO {
    return this._token;
  }

  set token(value: TokenDTO) {
    this._token = value;
  }
}
