import {Injectable} from '@angular/core';
import {HeartbeatService} from "./heartbeat.service";
import {Observable} from "rxjs";
import {ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexTooltip, ApexXAxis} from "ng-apexcharts";
import {TimeLinePoint} from "../shared/timeLinePoint";
import {ApexDataLabels, ApexTitleSubtitle} from "ng-apexcharts/lib/model/apex-types";
import {PeriodService} from "./period.service";

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  public chartNamesSeries: Array<string> = [];
  public chartSeries: Map<string, ApexAxisChartSeries> = new Map<string, ApexAxisChartSeries>();
  public chartTitleSeries: Map<string, ApexTitleSubtitle> = new Map<string, ApexTitleSubtitle>();

  defaultChartTitle: ApexTitleSubtitle = {
    text: 'Loading',
    align: 'center'
  }

  series: ApexAxisChartSeries = [
    {
      data: []
    }
  ];

  chart: ApexChart = {
    height: 450,
    type: "rangeBar",
    animations: {
      enabled: true,
      easing: "linear"
    }
  };

  plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: true
    }
  }

  xaxis: ApexXAxis = {
    type: "datetime"
  }

  tooltip: ApexTooltip = {
  }

  columnDataLabel: ApexDataLabels = {
  }

  constructor(public heartbeatService: HeartbeatService) {
    this.chartSeries = new Map<string, ApexAxisChartSeries>();
  }

  public refresh(chartId: string, periodService: PeriodService) {
    this.setSeries(chartId, periodService);
  }

  public httpGetSeries(key, period: string): Observable<ApexAxisChartSeries> {
    return new Observable((observer) => {
      this.heartbeatService.getTimelinePointsPeriod(period, key).subscribe(
        (timelinePoints) => {
          let series: ApexAxisChartSeries = [];
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

  setSeries(chartId: string, periodService: PeriodService) {
    this.chartTitleSeries.set(chartId, {
      text: periodService.getMetricName(chartId),
      align: 'center'
    });
    let metric = periodService.getMetric(chartId);
    let period = periodService.getPeriod(chartId);
    this.httpGetSeries(metric, period).subscribe(data => {
      this.chartSeries.set(chartId, data);
    })
  }

  getTitleSeries(type: string): ApexTitleSubtitle {
    let title = this.chartTitleSeries.get(type);
    if (title === undefined) {
      return this.defaultChartTitle;
    }
    return title;
  }

  getSeries(key: string): ApexAxisChartSeries {
    if (!this.chartNamesSeries.includes(key)) {
      this.chartNamesSeries.push(key);
    }
    let serie = this.chartSeries.get(key);
    if (serie !== undefined) {
      return serie;
    }
    return this.series;
  }
}
