import {Injectable} from '@angular/core';
import {HeartbeatService} from "./heartbeat.service";
import {Observable} from "rxjs";
import {DataSet} from "../shared/dataSet";

@Injectable({
  providedIn: 'root'
})
export class DataSetService {

  constructor(public heartbeatService: HeartbeatService) {
  }

  public dataSets(key): Observable<DataSet> {
    return new Observable((observer) => {
      this.heartbeatService.getDataSets("today", key).subscribe(
        (dataSets) => {
          observer.next(dataSets);
          observer.complete();
        }
      );
    });
  }
}
