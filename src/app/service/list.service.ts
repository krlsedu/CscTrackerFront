import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HeartbeatService} from "./heartbeat.service";
import {Heartbeat} from "../shared/heartbeat";
import {PeriodService} from "./period.service";
import {DataConverter} from "../Utils/dataConverter";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public chartNamesSeries: Array<string> = [];
  public chartListData: Map<string, Heartbeat[]> = new Map<string, Heartbeat[]>();
  public chartTitleList: Map<string, any> = new Map<string, any>();
  series: Heartbeat[] = [];

  constructor(public heartbeatService: HeartbeatService) {
  }


  public refresh(chartId: string, periodService: PeriodService) {
    this.setList(chartId, periodService);
  }

  public httpGetHeartbeats(period: string): Observable<Heartbeat[]> {
    return new Observable((observer) => {
      this.heartbeatService.getHeartbeatsPeriod(period).subscribe(
        (timelinePoints) => {
          let heartbeats: Heartbeat[] = [];
          for (let groupedDataKey in timelinePoints) {
            let heartbeat = timelinePoints[groupedDataKey];
            heartbeat.time = DataConverter.format(heartbeat.timeSpentMillis)
            heartbeats.push(heartbeat);
          }
          observer.next(heartbeats);
          observer.complete();
        }
      );
    });
  }

  setList(chartId: string, periodService: PeriodService) {
    this.chartTitleList.set(chartId, {
      text: periodService.getMetricName(chartId),
      align: 'center'
    });
    let period = periodService.getPeriod(chartId);
    this.httpGetHeartbeats(period).subscribe(data => {
      this.chartListData.set(chartId, data);
    })
  }

  getList(key: string): Heartbeat[] {
    if (!this.chartNamesSeries.includes(key)) {
      this.chartNamesSeries.push(key);
    }
    let heartbeats = this.chartListData.get(key);
    if (heartbeats !== undefined) {
      return heartbeats;
    }
    return this.series;
  }
}
