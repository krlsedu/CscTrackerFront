import {Component} from "@angular/core";

import {ApexAxisChartSeries, ApexChart, ApexPlotOptions, ApexXAxis} from "ng-apexcharts";

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent {
  // @ViewChild("chart") chart: ChartComponent | undefined;
  series: ApexAxisChartSeries = [
    {
      data: [
        {
          x: "Code",
          y: [
            1652400004283,
            1652400014283
          ]
        },
        {
          x: "Code",
          y: [
            1652500004283,
            1652501014283
          ]
        }
      ]
    }
  ];
  chart: ApexChart = {
    height: 350,
    type: "rangeBar"
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
