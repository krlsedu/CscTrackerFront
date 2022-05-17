import {Component} from "@angular/core";

import {ApexChart, ApexPlotOptions, ApexXAxis} from "ng-apexcharts";

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent {
  // @ViewChild("chart") chart: ChartComponent | undefined;
  labels: string[] = ["Team A", "Team B", "Team C", "Team D", "Team E"];

  series: number[]= [44, 55, 13, 43, 22];
  chart: ApexChart = {
    height: 350,
    type: "pie"
  }
  plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: true
    }
  }
  xaxis: ApexXAxis = {
    type: "datetime"
  }

  constructor() {

  }

  ngOnInit()
    :
    void {
  }

}
