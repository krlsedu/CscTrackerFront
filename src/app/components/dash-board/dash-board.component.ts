import {Component, OnInit} from '@angular/core';
import {HeartbeatService} from "../../service/heartbeat.service";
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
import {
  ApexDataLabels,
  ApexFill,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts/lib/model/apex-types";
import {map, timer} from "rxjs";
import {SeriesService} from "../../service/series.service";
import {DataSetService} from "../../service/data-set.service";
import {ColumnService} from "../../service/column.service";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  public chartNames: Array<string> = [];
  public chartLabels: Map<string, string[]> = new Map<string, string[]>();
  public chartData: Map<string, number[]> = new Map<string, number[]>();
  public chartTitle: Map<string, ApexTitleSubtitle> = new Map<string, ApexTitleSubtitle>();

  public chartNamesSeries: Array<string> = [];
  public chartSeries: Map<string, ApexAxisChartSeries> = new Map<string, ApexAxisChartSeries>();
  public chartTitleSeries: Map<string, ApexTitleSubtitle> = new Map<string, ApexTitleSubtitle>();

  public chartColumnNames: Array<string> = [];
  public chartColumnSeries: Map<string, ApexAxisChartSeries> = new Map<string, ApexAxisChartSeries>();
  public chartColumnCategory: Map<string, ApexXAxis> = new Map<string, ApexXAxis>();
  public chartColumnTitle: Map<string, ApexTitleSubtitle> = new Map<string, ApexTitleSubtitle>();


  constructor(public heartbeatService: HeartbeatService, public seriesService: SeriesService, public dataSetService: DataSetService, public columnService: ColumnService) {
    this.chartData = new Map<string, number[]>();
    this.chartLabels = new Map<string, string[]>();
    this.chartTitle = new Map<string, ApexTitleSubtitle>();
    this.chartSeries = new Map<string, ApexAxisChartSeries>();
    this.chartColumnSeries = new Map<string, ApexAxisChartSeries>();
    this.chartColumnTitle = new Map<string, ApexTitleSubtitle>();
    this.chartColumnCategory = new Map<string, ApexXAxis>();
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
    timer(0, 120000).pipe(
      map(() => {
        this.refreshColumns()
      })
    ).subscribe();
  }

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

  legendColumnChart: ApexLegend = {
    position: "right",
    offsetY: 40,
    formatter(legendName: string, opts?: any): string {
      return legendName + ' (' + DataConverter.format(opts.w.globals.initialSeries[opts.seriesIndex]) + ')';
    }
  }

  public refreshSeries() {
    console.log("refreshSeries");
    this.chartSeries = new Map<string, ApexAxisChartSeries>();
    this.chartNamesSeries.forEach(type => {
      this.chartTitleSeries.set(type, {
        text: type,
        align: 'center'
      });
      this.setSeries(type);
    })
  }

  public refreshColumns() {
    console.log("refreshColumns");
    this.chartColumnSeries = new Map<string, ApexAxisChartSeries>();
    this.chartColumnCategory = new Map<string, ApexXAxis>();
    this.chartColumnNames.forEach(type => {
      this.chartColumnTitle.set(type, {
        text: type,
        align: 'center'
      });
      this.setColumns(type);
    })
  }

  setColumns(type: string) {
    this.columnService.barDataSets(type).subscribe(data => {
      console.log("getSeries -> {}", type);
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
      this.chartColumnSeries.set(type, series);
      this.chartColumnCategory.set(type, categories);
    })
  }

  setSeries(type: string) {
    this.seriesService.series(type).subscribe(data => {
      console.log("getSeries -> {}", type);
      this.chartSeries.set(type, data);
    })
  }

  public refresh() {
    console.log("refresh");
    this.chartNames.forEach(type => {
      this.setData(type);
    });
  }

  setData(type: string) {
    console.log("setData -> {}", type);
    this.dataSetService.dataSets(type).subscribe(dataSet => {
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
    });
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
    return this.series;
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
