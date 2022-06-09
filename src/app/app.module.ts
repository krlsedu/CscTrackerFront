import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashBoardComponent} from './components/dash-board/dash-board.component';
import {ListHeartbeatsComponent} from './components/list-heartbeats/list-heartbeats.component';

import {HttpClientModule} from '@angular/common/http';

import {HeartbeatService} from './service/heartbeat.service';

import {NgApexchartsModule} from "ng-apexcharts";
import {GanttComponent} from './components/gantt/gantt.component';
import {SeriesService} from "./service/series.service";
import {DataSetService} from "./service/data-set.service";

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    ListHeartbeatsComponent,
    GanttComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [HeartbeatService, SeriesService, DataSetService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
