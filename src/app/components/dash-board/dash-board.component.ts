import {Component, OnInit} from '@angular/core';
import {HeartbeatService} from "../../service/heartbeat.service";
import {DataHandler} from "../../Utils/dataHandler";
import {DataConverter} from "../../Utils/dataConverter";


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexNoData,
  ApexPlotOptions,
  ApexTheme,
  ApexTooltip,
  ApexXAxis
} from "ng-apexcharts";
import {ApexTitleSubtitle} from "ng-apexcharts/lib/model/apex-types";
import {map, timer} from "rxjs";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  private _dateGroup: DataHandler | undefined;

  public chartNames: Array<string> = [];
  public chartLabels: Map<string, string[]> = new Map<string, string[]>();
  public chartData: Map<string, number[]> = new Map<string, number[]>();
  public chartTitle: Map<string, ApexTitleSubtitle> = new Map<string, ApexTitleSubtitle>();

  public chartNamesSeries: Array<string> = [];
  public chartSeries: Map<string, ApexAxisChartSeries> = new Map<string, ApexAxisChartSeries>();
  public chartTitleSeries: Map<string, ApexTitleSubtitle> = new Map<string, ApexTitleSubtitle>();

  series: ApexAxisChartSeries = [
    {
      data: []
    }
  ];

  pieSeries: number[] = [];
  pieLabels: string[] = [];
  pieChartTitle: ApexTitleSubtitle = {
    text: 'Loading',
    align: 'center'
  }

  chartTheme: ApexTheme = {
    mode: 'light'
  }

  noData: ApexNoData = {
    text: undefined,
    align: 'center',
    verticalAlign: 'middle',
    offsetX: 0,
    offsetY: 0,
    style: {
      color: undefined,
      fontSize: '14px',
      fontFamily: undefined
    }
  }

  chart: ApexChart = {
    height: 450,
    type: "rangeBar",
    animations: {
      enabled: true,
      easing: "linear"
    },
    id: "chart-1"
  };
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

  xaxis: ApexXAxis = {
    type: "datetime"
  }

  legend: ApexLegend = {
    show: true,
    position: 'bottom',
    horizontalAlign: 'left',
    height: 100,
    formatter(legendName: string, opts?: any): string {
      return legendName + ' (' + DataConverter.format(opts.w.globals.initialSeries[opts.seriesIndex]) + ')';
    }
  }


  constructor(public heartbeatService: HeartbeatService) {
    this.chartData = new Map<string, number[]>();
    this.chartLabels = new Map<string, string[]>();
    this.chartTitle = new Map<string, ApexTitleSubtitle>();
    this.chartSeries = new Map<string, ApexAxisChartSeries>();
    timer(0, 20000).pipe(
      map(() => {
        this.refresh()
      })
    ).subscribe();
    timer(0, 120000).pipe(
      map(() => {
        this.refreshSeries()
      })
    ).subscribe();
  }

  public refreshSeries() {
    console.log("refreshSereis");
    this.chartSeries = new Map<string, ApexAxisChartSeries>();
    this.chartNamesSeries.forEach(type => {
      this.chartTitleSeries.set(type, {
        text: type,
        align: 'center'
      });
    })
  }

  public refresh() {
    console.log("refresh");
    this.heartbeatService.getData().subscribe(data => {
      this._dateGroup = data;
      this.chartNames.forEach(type => {
        this.setData(data, type);
      })
    });
  }

  setData(data: DataHandler, type: string) {
    console.log("setData -> {}", type);
    let dataSet = data.getDataSet(type, "timeSpentMillis");
    this.chartLabels.set(type, []);
    this.chartData.set(type, []);
    this.chartTitle.set(type, {
      text: type,
      align: 'center'
    });
    for (let dataSetItem of dataSet) {
      let label = dataSetItem.label;
      if (label !== "null") {
        // @ts-ignore
        this.chartLabels.get(type).push(label);
        // @ts-ignore
        this.chartData.get(type).push(dataSetItem.value);
      }
    }
  }

  ngOnInit() {
  }

  add() {
  }

  getSeries(key: string): ApexAxisChartSeries {
    if (!this.chartNamesSeries.includes(key)) {
      this.chartNamesSeries.push(key);
    }
    let serie = this.chartSeries.get(key);
    if (serie !== undefined) {
      return serie;
    }
    if (this._dateGroup !== undefined) {
      this._dateGroup.series(key).subscribe(data => {
        console.log("getSeries -> {}", key);
        this.chartSeries.set(key,data);
      })
    }
    return this.series;
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
      if (this._dateGroup !== undefined) {
        return this.getData(type);
      }
      return this.pieSeries;
    }
    return numbers;
  }

  getTitleSeries(type: string): ApexTitleSubtitle {
    let title = this.chartTitleSeries.get(type);
    if (title === undefined) {
      return this.pieChartTitle;
    }
    return title;
  }

  getTitle(type: string): ApexTitleSubtitle {
    let title = this.chartTitle.get(type);
    if (title === undefined) {
      return this.pieChartTitle;
    }
    return title;
  }

}
