import {Component, OnInit} from '@angular/core';
import {SeriesService} from "../../service/series.service";
import {ColumnService} from "../../service/column.service";
import {PeriodService} from "../../service/period.service";
import {DefaultChartService} from "../../service/default-chart.service";
import {PieChartService} from "../../service/pie-chart.service";
import {ListService} from "../../service/list.service";

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  constructor(public seriesService: SeriesService,
              public columnService: ColumnService,
              public periodService: PeriodService,
              public defaultChartService: DefaultChartService,
              public pieChartService: PieChartService,
              public listService: ListService) {
    periodService.resetAllInfo();
    periodService.registerServices('pie', pieChartService);
    periodService.registerServices('series', seriesService);
    periodService.registerServices('column', columnService);
    periodService.registerServices('list', listService);
    periodService.registerBox('hostName', 'series', 'today', 120)
    periodService.registerBox('hostName', 'column', 'week', 120)
    periodService.registerBox('applicationName')
    periodService.registerBox('ideName')
    periodService.registerBox('project')
    periodService.registerBox('language')
    periodService.registerBox('category')
    periodService.registerBox('domain')
    periodService.registerBox('osName')
    periodService.registerBox('hostName')
    periodService.registerBox('heartbeat', 'list', '15m', 30)
    periodService.registerBox('entity', 'series', '10m', 10)
  }

  ngOnInit() {
  }

  public changePeriodEvent(boxId: string, period) {
    let chartType = this.periodService.getType(boxId);
    console.log("changeEvent -> {}", boxId, period, chartType);
    this.periodService.setPeriod(boxId, period);
    switch (chartType) {
      case "pie":
        this.pieChartService.setDataPie(boxId, this.periodService);
        break;
      case "series":
        this.seriesService.setSeries(boxId, this.periodService);
        break;
      case "column":
        this.columnService.setColumns(boxId, this.periodService);
        break;
      case "list":
        this.listService.setList(boxId,this.periodService);
        break;
    }
  }

  public changeFrequencyEvent(boxId: string, frequency: number = 60) {
    let chartType = this.periodService.getType(boxId);
    this.periodService.setFrequency(boxId, frequency);
    console.log("changeFrequencyEvent -> {}", boxId, frequency, chartType);
    this.periodService.registerBoxRefresh(boxId);
  }

  public changeMetricEvent(boxId: string, metric: string) {
    let chartType = this.periodService.getType(boxId);
    this.periodService.setMetric(boxId, metric);
    console.log("changeMetricEvent -> {}", boxId, metric, chartType);
    switch (chartType) {
      case "pie":
        this.pieChartService.setDataPie(boxId, this.periodService);
        break;
      case "series":
        this.seriesService.setSeries(boxId, this.periodService);
        break;
      case "column":
        this.columnService.setColumns(boxId, this.periodService);
        break;
      case "list":
        this.listService.setList(boxId,this.periodService)
        break;
    }
  }
}
