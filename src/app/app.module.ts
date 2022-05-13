import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {BubbleChartComponent} from './bubble-chart/bubble-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {DashBoardComponent} from './components/dash-board/dash-board.component';
import {RadarChartComponent} from './radar-chart/radar-chart.component';
import {DoughnutChartComponent} from './doughnut-chart/doughnut-chart.component';
import {ListHeartbeatsComponent} from './components/list-heartbeats/list-heartbeats.component';

import {ChartsModule} from '@rinminase/ng-charts';
import {HttpClientModule} from '@angular/common/http';

import {HeartbeatService} from './service/heartbeat.service';

import {NgApexchartsModule} from "ng-apexcharts";
import {GanttComponent} from './components/gantt/gantt.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent,
    DashBoardComponent,
    RadarChartComponent,
    DoughnutChartComponent,
    ListHeartbeatsComponent,
    GanttComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [HeartbeatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
