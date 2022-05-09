import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {UserDTO} from "../shared/userDTO";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  redirectUri = 'http://localhost:4200';
  authServer = 'http://localhost:8899/oauth';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };
  GET
  get(autorazationCode): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(
        this.authServer + '?code=' + autorazationCode + '&redirect_uri=' + this.redirectUri,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }


  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
