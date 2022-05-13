import {Component, OnInit} from '@angular/core';
import {HeartbeatService} from "../../service/heartbeat.service";
import {DataHandler} from "../../Utils/dataHandler";
import {Colors} from "@rinminase/ng-charts";
import {DataConverter} from "../../Utils/dataConverter";


import {ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexXAxis} from "ng-apexcharts";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  private _dateGroup: DataHandler | undefined;

  public chartLabels: Map<string, string[]> = new Map<string, string[]>();
  public chartData: Map<string, number[]> = new Map<string, number[]>();
  public barChartColors: Colors[] = [
    {backgroundColor: ['blue', 'green', 'red', 'orange', 'yellow', 'purple', 'grey', 'brown', 'pink', 'cyan', 'magenta']}
  ];

  series: ApexAxisChartSeries = [
    {
      data: [

      ]
    }
  ];
  chart: ApexChart = {
    height: 350,
    type: "rangeBar"
  }
  chartPie: ApexChart = {
    height: 350,
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
    }
  ]
  plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: true
    }
  }
  xaxis: ApexXAxis = {
    type: "datetime"
  }


  constructor(public heartbeatService: HeartbeatService) {
    this.heartbeatService.getData().subscribe(data => {
      this._dateGroup = data;
    });
  }

  public refresh() {
    this.chartData = new Map<string, number[]>();
    this.chartLabels = new Map<string, string[]>();
    this.heartbeatService.getData().subscribe(data => {
      this._dateGroup = data;
    });
  }

  setData(data: DataHandler, type: string) {
    let dataSet = data.getDataSet(type, "timeSpentMillis");
    this.chartLabels.set(type, []);
    this.chartData.set(type, []);
    for (let dataSetItem of dataSet) {
      // @ts-ignore
      this.chartLabels.get(type).push(dataSetItem.label + " (" + DataConverter.format(dataSetItem.value) + ")");
      // @ts-ignore
      this.chartData.get(type).push(dataSetItem.value);
    }
  }

  ngOnInit() {
  }

  add() {
  }

  getSeries(key: string): ApexAxisChartSeries {
    if (this._dateGroup !== undefined) {
      return this._dateGroup.series(key) ;
    } else {
      return this.series;
    }
  }

  getLabels(type: string): string[] {
    let strings = this.chartLabels.get(type);
    if (strings === undefined) {
      return ['Nenhum'];
    }
    return strings;
  }

  getData(type: string): number[] {
    let numbers = this.chartData.get(type);
    if (numbers === undefined) {
      if (this._dateGroup !== undefined) {
        this.setData(this._dateGroup, type);
        numbers = this.chartData.get(type);
      } else {
        return [];
      }
    }
    return numbers === undefined ? [] : numbers;
  }

}
