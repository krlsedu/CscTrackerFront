import {Heartbeat} from "../shared/heartbeat";
import {DataSet} from "../shared/dataSet";
import {TimeLinePoint} from "../shared/timeLinePoint";
import {ApexAxisChartSeries} from "ng-apexcharts";

export class DataHandler {
  private _data: Heartbeat[];
  private _datasets: Map<string, any>;
  private _keySomeds: Map<string, string[]>;
  private _keyTimeLines: Map<string, ApexAxisChartSeries>;

  constructor(data: Heartbeat[]) {
    this._data = data;
    this._datasets = new Map();
    this._keySomeds = new Map();
    this._keyTimeLines = new Map();
  }

  public groupAndSum(key, numericKey) {
    if (this._datasets.get(key) === undefined) {
      this._datasets.set(key, this.groupByKey(key));
      this._keySomeds.set(key, []);
    }
    this.sum(key, numericKey);
  }

  private groupByKey(key) {
    return this._data.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  sum(key, numericKey) {
    let dataSet = this._datasets.get(key);
    for (let groupedDataKey in dataSet) {
      let sumByKey = this.sumBy(dataSet[groupedDataKey], numericKey);
      let heartbeat = dataSet[groupedDataKey];
      if (heartbeat.groupedSums === undefined) {
        heartbeat.groupedSums = new Map();
      }
      heartbeat.groupedSums.set(numericKey, sumByKey);
      console.log("heartbeats -> ", groupedDataKey, sumByKey, heartbeat.groupedSums);
    }
    let keySomed = this._keySomeds.get(key);
    keySomed === undefined ? this._keySomeds.set(key, [numericKey]) : keySomed.push(numericKey);
  }

  public series(key): ApexAxisChartSeries {
    let series: ApexAxisChartSeries | undefined = this._keyTimeLines.get(key);
    if (series === undefined) {
      series = [];
      let dataSet = this._datasets.get(key);
      if (dataSet === undefined) {
        dataSet = this.groupByKey(key);
      }
      let timeLinePoints: TimeLinePoint[] = [];
      for (let groupedDataKey in dataSet) {
        let groupedData = dataSet[groupedDataKey];
        for (let heartbeat of groupedData) {
          let heartbeatElement = new Date(heartbeat['dateTime']);
          let heartbeatElement1 = new Date(heartbeat['dateTimeEnd']);
          let timeLinePoint = new TimeLinePoint(groupedDataKey, [heartbeatElement.getTime(), heartbeatElement1.getTime()]);
          timeLinePoints.push(timeLinePoint);
        }
      }
      series = [{data: timeLinePoints}];
      this._keyTimeLines.set(key, series);
      return series;
    } else {
      return series;
    }
  }

  sumBy(dataSet, numericKey): number {
    return (dataSet.map(heartbeat => heartbeat[numericKey])).reduce(function (a, b) {
      return a + b;
    }, 0)
  }

  public getDataSet(key, numericKey): Array<DataSet> {
    let dataSets: Array<DataSet> = [];
    let dataSet = this._datasets.get(key);
    if (dataSet === undefined) {
      this.groupAndSum(key, numericKey);
      dataSet = this._datasets.get(key);
    }
    for (let groupedDataKey in dataSet) {
      let heartbeat = dataSet[groupedDataKey];
      let dataSetItem = new DataSet(groupedDataKey, heartbeat.groupedSums.get(numericKey));
      dataSets.push(dataSetItem);
    }
    dataSets.sort((a, b) => b.value - a.value);
    return dataSets;
  }
}
