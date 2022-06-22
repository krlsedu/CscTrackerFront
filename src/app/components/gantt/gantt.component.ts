import {Component, ViewChild} from "@angular/core";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";


export type ChartOptions = {
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})

export class GanttComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;



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

  columnChartSeries: ApexAxisChartSeries = [
    {
      name: "PRODUCT A",
      data: [44, 55, 41, 67, 22, 43]
    },
    {
      name: "PRODUCT B",
      data: [13, 23, 20, 8, 13, 27]
    },
    {
      name: "PRODUCT C",
      data: [11, 17, 15, 15, 21, 14]
    },
    {
      name: "PRODUCT D",
      data: [21, 7, 25, 29, 22, 8]
    }
  ]

  columnChart: ApexChart = {
    type: "bar",
    height: 350,
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    }
  }

  columnChartOptions: ApexPlotOptions = {
    bar: {
      horizontal: false
    }
  }

  columnCategory: ApexXAxis = {
    type: "category",
    categories: [
      "01/2011",
      "02/2011",
      "03/2011",
      "04/2011",
      "05/2011",
      "06/2011"
    ]
  }

  legendColumnChart: ApexLegend = {
    position: "right",
    offsetY: 40
  }

  fill: ApexFill ={
    opacity: 1
  }

  constructor() {
  }

  ngOnInit()
    :
    void {
  }

}
