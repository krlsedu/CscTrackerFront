import {Injectable} from '@angular/core';
import {ApexLegend, ApexNoData, ApexTheme} from "ng-apexcharts";
import {DataConverter} from "../Utils/dataConverter";

@Injectable({
  providedIn: 'root'
})
export class DefaultChartService {

  chartTheme: ApexTheme = {
    mode: 'light'
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

  constructor() { }
}
