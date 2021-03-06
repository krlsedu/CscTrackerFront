import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Heartbeat} from '../shared/heartbeat';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {TimeLinePoint} from "../shared/timeLinePoint";
import {DataSet} from "../shared/dataSet";
import {BarDataSet} from "../shared/barDataSet";

@Injectable({
  providedIn: 'root',
})
export class HeartbeatService {
  // Base url
  baseurl = 'https://backend.csctracker.com';
  bffurl = 'https://bff.csctracker.com';
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    }),
  };
  // POST
  // CreateBug(data): Observable<Heartbeat> {
  //   return this.http
  //     .post<Heartbeat>(
  //       this.baseurl + '/heartbeats',
  //       JSON.stringify(data),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.errorHandl));
  // }
  // GET
  // GetIssue(id): Observable<Heartbeat> {
  //   return this.http
  //     .get<Heartbeat>(this.baseurl + '/bugtracking/' + id)
  //     .pipe(retry(1), catchError(this.errorHandl));
  // }
  // GET
  getHeartbeats(): Observable<Heartbeat> {
    return this.http
      .get<Heartbeat>(this.baseurl + '/heartbeats', this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getHeartbeatsPeriod(period: String): Observable<Heartbeat> {
    return this.http
      .get<Heartbeat>(this.baseurl + '/heartbeats?period=' + period, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getTimelinePointsPeriod(period: String, metric: String): Observable<TimeLinePoint> {
    return this.http
      .get<TimeLinePoint>(this.bffurl + '/series?period=' + period + '&metric=' + metric, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getDataSets(period: String, metric: String): Observable<DataSet> {
    return this.http
      .get<DataSet>(this.bffurl + '/dataset?period=' + period + '&metric=' + metric, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  getBarDataSets(period: String, metric: String): Observable<BarDataSet> {
    return this.http
      .get<BarDataSet>(this.bffurl + '/bar-dataset?period=' + period + '&metric=' + metric, this.httpOptions)
      // .get<BarDataSet>('http://localhost:5000/bar-dataset?period=' + period + '&metric=' + metric, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // PUT
  // UpdateBug(id, data): Observable<Heartbeat> {
  //   return this.http
  //     .put<Heartbeat>(
  //       this.baseurl + '/bugtracking/' + id,
  //       JSON.stringify(data),
  //       this.httpOptions
  //     )
  //     .pipe(retry(1), catchError(this.errorHandl));
  // }
  // DELETE
  // DeleteBug(id) {
  //   return this.http
  //     .delete<Heartbeat>(this.baseurl + '/bugtracking/' + id, this.httpOptions)
  //     .pipe(retry(1), catchError(this.errorHandl));
  // }
  // Error handling
  errorHandl(error) {
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
