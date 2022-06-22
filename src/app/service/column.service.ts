import {Injectable} from '@angular/core';
import {HeartbeatService} from "./heartbeat.service";
import {Observable} from "rxjs";
import {BarDataSet} from "../shared/barDataSet";

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(public heartbeatService: HeartbeatService) {
  }

  public barDataSets(key): Observable<BarDataSet> {
    return new Observable((observer) => {
      this.heartbeatService.getBarDataSets("week", key).subscribe(
        (datasets) => {

          observer.next(datasets);
          observer.complete();
        }
      );
    });
  }
}
