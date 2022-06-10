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

  public dataSets(key): Observable<DataSet[]> {
    return new Observable((observer) => {
      this.heartbeatService.getDataSets("today", key).subscribe(
        (datasets) => {
          let dataSets: DataSet[] = [];
          for (let groupedDataKey in datasets) {
            let heartbeat = datasets[groupedDataKey];
            dataSets.push(heartbeat);
          }

          dataSets.sort((a, b) => b.value - a.value);

          observer.next(dataSets);
          observer.complete();
        }
      );
    });
  }
}
