import {Injectable} from '@angular/core';
import {HeartbeatService} from "./heartbeat.service";
import {Observable} from "rxjs";
import {ApexAxisChartSeries} from "ng-apexcharts";
import {TimeLinePoint} from "../shared/timeLinePoint";

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(public heartbeatService: HeartbeatService) {}

  public series(key): Observable<ApexAxisChartSeries> {
    return new Observable((observer) => {
      this.heartbeatService.getTimelinePointsPeriod("today",key).subscribe(
        (timelinePoints) => {
          let series: ApexAxisChartSeries= [];
          let timeLinePoints: TimeLinePoint[] = [];
          for (let groupedDataKey in timelinePoints) {
            let heartbeat = timelinePoints[groupedDataKey];
            timeLinePoints.push(heartbeat);
          }
          series = [{data: timeLinePoints}];
          observer.next(series);
          observer.complete();
        }
      );
    });
  }
}
