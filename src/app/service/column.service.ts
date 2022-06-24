import {Injectable} from '@angular/core';
import {HeartbeatService} from "./heartbeat.service";
import {Observable} from "rxjs";
import {BarDataSet} from "../shared/barDataSet";
import {ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexXAxis} from "ng-apexcharts";
import {
  ApexDataLabels,
  ApexFill,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts/lib/model/apex-types";
import {DataConverter} from "../Utils/dataConverter";
import {PeriodService} from "./period.service";

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  public chartColumnNames: Array<string> = [];
  public chartColumnSeries: Map<string, ApexAxisChartSeries> = new Map<string, ApexAxisChartSeries>();
  public chartColumnCategory: Map<string, ApexXAxis> = new Map<string, ApexXAxis>();
  public chartColumnTitle: Map<string, ApexTitleSubtitle> = new Map<string, ApexTitleSubtitle>();

  columnChartSeries: ApexAxisChartSeries = []

  columnChart: ApexChart = {
    type: "bar",
    height: 350,
    stacked: true,

    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }

  }

  columnChartOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,

    }
  }

  columnCategory: ApexXAxis = {
    type: "category",
    categories: []
  }

  yAxys: ApexYAxis = {
    labels: {
      formatter: function (value: number) {
        return DataConverter.format(value);
      }
    },
    tooltip: {
      enabled: false
    }
  }

  defaultChartTitle: ApexTitleSubtitle = {
    text: 'Loading',
    align: 'center'
  }

  fill: ApexFill = {
    opacity: 1
  }

  columnChartResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0
        }
      }
    }
  ]

  columnDataLabel: ApexDataLabels = {
    formatter(val: string | number | number[], opts?: any): string | number {
      // @ts-ignore
      return DataConverter.format(val);
    }
  }

  constructor(public heartbeatService: HeartbeatService) {
    this.chartColumnSeries = new Map<string, ApexAxisChartSeries>();
    this.chartColumnTitle = new Map<string, ApexTitleSubtitle>();
    this.chartColumnCategory = new Map<string, ApexXAxis>();
  }

  getTitleColumn(type: string): ApexTitleSubtitle {
    let title = this.chartColumnTitle.get(type);
    if (title === undefined) {
      return this.defaultChartTitle;
    }
    return title;
  }

  public refresh(chartId: string, periodService: PeriodService) {
    console.log("refresh -> {}", chartId);
    this.chartColumnSeries = new Map<string, ApexAxisChartSeries>();
    this.chartColumnCategory = new Map<string, ApexXAxis>();
    this.setColumns(chartId, periodService);
  }

  setColumns(chartId: string, periodService: PeriodService) {
    this.chartColumnTitle.set(chartId, {
      text: periodService.getMetricName(chartId),
      align: 'center'
    });
    let metric = periodService.getMetric(chartId);
    let period = periodService.getPeriod(chartId);

    this.barDataSets(metric, period).subscribe(data => {
      console.log("getBarDataset -> {}", metric);
      var series: ApexAxisChartSeries = []
      var categories: ApexXAxis = {}
      categories.categories = []
      categories.type = "category"
      for (let serie in data.series) {
        let serieData = data.series[serie];
        series.push(serieData);
      }
      for (let category in data.categories) {
        let categoryData = data.categories[category];
        categories.categories.push(categoryData);
      }
      this.chartColumnSeries.set(chartId, series);
      this.chartColumnCategory.set(chartId, categories);
    })
  }

  public barDataSets(key: string, period: string): Observable<BarDataSet> {
    return new Observable((observer) => {
      this.heartbeatService.getBarDataSets(period, key).subscribe(
        (datasets) => {
          observer.next(datasets);
          observer.complete();
        }
      );
    });
  }

  getColumnSeries(key: string): ApexAxisChartSeries {
    if (!this.chartColumnNames.includes(key)) {
      this.chartColumnNames.push(key);
    }
    let serie = this.chartColumnSeries.get(key);
    if (serie !== undefined) {
      return serie;
    }
    return this.columnChartSeries;
  }

  getColumnCategories(key: string): ApexXAxis {
    let serie = this.chartColumnCategory.get(key);
    if (serie !== undefined) {
      return serie;
    }
    return this.columnCategory;
  }
}
