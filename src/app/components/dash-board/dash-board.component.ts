import {Component, OnInit} from '@angular/core';
import {HeartbeatService} from "../../service/heartbeat.service";
import {DataHandler} from "../../Utils/dataHandler";
import {DataConverter} from "../../Utils/dataConverter";


import {ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexTheme, ApexXAxis} from "ng-apexcharts";
import {ApexTitleSubtitle} from "ng-apexcharts/lib/model/apex-types";
import {map, timer} from "rxjs";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  private _dateGroup: DataHandler | undefined;

  public chartLabels: Map<string, string[]> = new Map<string, string[]>();
  public chartData: Map<string, number[]> = new Map<string, number[]>();
  public chartTitle: Map<string, ApexTitleSubtitle> = new Map<string, ApexTitleSubtitle>();
  public chartNames: Array<string> = [];

  series: ApexAxisChartSeries = [
    {
      data: []
    }
  ];

  pieSeries: number[] = [];
  pieLabels: string[] = [];
  pieChartTitle: ApexTitleSubtitle = {
    text: 'test',
    align: 'center'
  }

  chartTheme: ApexTheme = {
    mode: 'light'
  }

  chart: ApexChart = {
    height: 350,
    type: "rangeBar"
  };
  chartPie: ApexChart = {
    type: "pie"
  }
  responsive = [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: "bottom"
      }
    }
  }];

  plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: true
    }
  }

  xaxis: ApexXAxis = {
    type: "datetime"
  }


  constructor(public heartbeatService: HeartbeatService) {
    this.chartData = new Map<string, number[]>();
    this.chartLabels = new Map<string, string[]>();
    this.chartTitle = new Map<string, ApexTitleSubtitle>();
    timer(0, 60000).pipe(
      map(() => {
        this.refresh()
      })
    ).subscribe();
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
        this.chartLabels.get(type).push(label + " (" + DataConverter.format(dataSetItem.value) + ")");
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
    if (this._dateGroup !== undefined) {
      return this._dateGroup.series(key);
    } else {
      return this.series;
    }
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

  getTitle(type: string): ApexTitleSubtitle {
    let title = this.chartTitle.get(type);
    if (title === undefined) {
      return this.pieChartTitle;
    }
    return title;
  }

}
