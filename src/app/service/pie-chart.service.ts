import {Injectable} from '@angular/core';
import {HeartbeatService} from "./heartbeat.service";
import {Observable} from "rxjs";
import {DataSet} from "../shared/dataSet";
import {ApexTitleSubtitle} from "ng-apexcharts/lib/model/apex-types";
import {ApexChart, ApexPlotOptions, ApexTooltip} from "ng-apexcharts";
import {DataConverter} from "../Utils/dataConverter";
import {PeriodService} from "./period.service";

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  public chartNames: Array<string> = [];
  public chartLabels: Map<string, string[]> = new Map<string, string[]>();
  public chartData: Map<string, number[]> = new Map<string, number[]>();
  public chartTitle: Map<string, ApexTitleSubtitle> = new Map<string, ApexTitleSubtitle>();


  pieSeries: number[] = [];
  pieLabels: string[] = [];
  pieChartTitle: ApexTitleSubtitle = {
    text: 'Loading',
    align: 'center'
  }

  chartPie: ApexChart = {
    type: "donut"
  };

  tooltip: ApexTooltip = {
    y: {
      formatter: function (value) {
        return DataConverter.format(value);
      }
    }
  };
  responsive = [{
    options: {
      legend: {
        position: "bottom"
      }
    }
  }];

  plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: true
    },
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            formatter: function (w) {
              let reduce = w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0);
              return DataConverter.format(reduce);
            }
          },
          value: {
            formatter(val: string): string {
              try {
                return DataConverter.format(Number.parseFloat(val));
              } catch (e) {
                return val;
              }
            }
          }
        }
      }
    }
  }

  constructor(public heartbeatService: HeartbeatService) {
    this.chartData = new Map<string, number[]>();
    this.chartLabels = new Map<string, string[]>();
    this.chartTitle = new Map<string, ApexTitleSubtitle>();
  }

  public refresh(chartId: string, periodService: PeriodService) {
    this.setDataPie(chartId, periodService);
  }

  public dataSets(key, period): Observable<DataSet[]> {
    return new Observable((observer) => {
      this.heartbeatService.getDataSets(period, key).subscribe(
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

  setDataPie(chartId: string, periodService: PeriodService) {
    let metric = periodService.getMetric(chartId);
    let period = periodService.getPeriod(chartId);
    this.dataSets(metric, period).subscribe(dataSet => {
      this.chartLabels.set(chartId, []);
      this.chartData.set(chartId, []);
      this.chartTitle.set(chartId, {
        text: periodService.getMetricName(chartId),
        align: 'center'
      });
      for (let dataSetItem of dataSet) {
        let label = dataSetItem.label;
        if (label !== "null") {
          // @ts-ignore
          this.chartLabels.get(chartId).push(label);
          // @ts-ignore
          this.chartData.get(chartId).push(dataSetItem.value);
        }
      }
    });
  }

  getLabels(type: string): string[] {
    let strings = this.chartLabels.get(type);
    if (strings === undefined) {
      return this.pieLabels;
    }
    return strings;
  }

  getData(type: string): number[] {
    let numbers = this.chartData.get(type);
    if (!this.chartNames.includes(type)) {
      this.chartNames.push(type);
    }
    if (numbers === undefined) {
      return this.pieSeries;
    }
    return numbers;
  }

  getTitle(type: string): ApexTitleSubtitle {
    let title = this.chartTitle.get(type);
    if (title === undefined) {
      return this.pieChartTitle;
    }
    return title;
  }
}
