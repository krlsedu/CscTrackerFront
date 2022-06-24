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

import {NgbAlertModule, NgbDropdownModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
        NgApexchartsModule,
        NgbPaginationModule,
        NgbAlertModule,
        NgbDropdownModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [HeartbeatService, SeriesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
