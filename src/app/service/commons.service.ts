import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Configs} from "../shared/configs";
import {User} from "../shared/user";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommonsService implements OnInit {
  token = localStorage.getItem('token');
  public baseurl = 'https://notify.csctracker.com';

  config: Configs = {
    'favoriteContact': 'Suelen Boff',
    'applicationNotify': 'Calendar',
    'timeZone': 'America/Sao_Paulo'
  }

  user: User = {};

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    }),
  };

  tester: Boolean = false;

  constructor(public http: HttpClient) {
    console.log(this.token);
  }

  ngOnInit(): void {
    console.log('CommonsService.init');
    this.init();
  }

  init() {
    let item = localStorage.getItem('user');
    if (item) {
      this.user = JSON.parse(item);
      this.tester = this.user.email === 'krlsedu@gmail.com';
    }
    item = localStorage.getItem('configs');
    if (item) {
      this.config = JSON.parse(item);
    }
    this.getUser().subscribe((data) => {
      this.user = data;
      this.tester = this.user.email === 'krlsedu@gmail.com';
      localStorage.setItem('user', JSON.stringify(data));
    });
    this.getConfigs().subscribe((data) => {
      this.config = data;
      localStorage.setItem('configs', JSON.stringify(data));
    });
  }

  saveConfig(data: Configs): Observable<String> {
    return this.http
      .post<String>(
        this.baseurl + '/configs',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getConfigs(): Observable<Configs> {
    return this.http
      .get<Configs>(this.baseurl + '/configs', this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getUser(): Observable<User> {
    return this.http
      .get<User>(this.baseurl + '/user', this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  public errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    if (error.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/'
    }

    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
