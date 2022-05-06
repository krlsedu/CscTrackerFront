import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {BubbleChartComponent} from './bubble-chart/bubble-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {RadarChartComponent} from './radar-chart/radar-chart.component';
import {DoughnutChartComponent} from './doughnut-chart/doughnut-chart.component';

import {ChartsModule} from '@rinminase/ng-charts';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent,
    PieChartComponent,
    RadarChartComponent,
    DoughnutChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
