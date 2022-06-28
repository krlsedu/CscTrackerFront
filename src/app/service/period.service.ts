import {Injectable} from '@angular/core';
// @ts-ignore
import {Subscription} from "rxjs/src/internal/Subscription";
import {map, timer} from "rxjs";
import {Line} from "../shared/line";

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor() {
  }

  public boxesPeriodValue: Map<string, number> = new Map<string, number>();
  public boxesFrequencyValue: Map<string, number> = new Map<string, number>();
  public boxesMetricValue: Map<string, number> = new Map<string, number>();
  public boxesTypeValue: Map<string, string> = new Map<string, string>();
  public boxesSubscription: Map<string, Subscription> = new Map<string, Subscription>();
  public services: Map<string, any> = new Map<string, any>();

  public selectedPeriod: string[] = [];
  public selectedFrequency: number[] = [];
  public selectedMetric: string[] = [];

  public periodAdd: string = "today";
  public frequencyAdd: number = 60;
  public metricAdd: string = "hostName";
  public typeAdd: string = "series";

  public registredBoxes: Array<string> = [];
  public removedBoxes: Array<string> = [];
  public registredPieBoxes: Array<string> = [];
  public lines: Line[] = [];

  public periods = [
    {id: '1m', name: 'Last 1 minute'},
    {id: '5m', name: 'Last 5 minutes'},
    {id: '10m', name: 'Last 10 minutes'},
    {id: '15m', name: 'Last 15 minutes'},
    {id: '30m', name: 'Last 30 minutes'},
    {id: '1h', name: 'Last 1 hour'},
    {id: '2h', name: 'Last 2 hours'},
    {id: '3h', name: 'Last 3 hours'},
    {id: '6h', name: 'Last 6 hours'},
    {id: '12h', name: 'Last 12 hours'},
    {id: '24h', name: 'Last 24 hours'},
    {id: 'today', name: 'Today'},
    {id: 'yesterday', name: 'Yesterday'},
    {id: 'week', name: 'Week'},
    {id: 'month', name: 'Month'},
    {id: 'year', name: 'Year'},
  ];

  public frequencies = [
    {id: 10, name: '10 seconds'},
    {id: 30, name: '30 seconds'},
    {id: 60, name: '1 minute'},
    {id: 120, name: '2 minutes'},
    {id: 300, name: '5 minutes'},
    {id: 600, name: '10 minutes'}
  ];

  public metrics = [
    {id: 'hostName', name: 'Host Name'},
    {id: 'applicationName', name: 'Application Name'},
    {id: 'project', name: 'Project'},
    {id: 'language', name: 'Language'},
    {id: 'category', name: 'Category'},
    {id: 'domain', name: 'Domain'},
    {id: 'entity', name: 'Entity'},
    {id: 'osName', name: 'OS Name'},
    {id: 'ideName', name: 'IDE Name'},
  ];

  public types = [
    {id: 'series', name: 'Time Line Chart'},
    {id: 'column', name: 'Bar Chart'},
    {id: 'pie', name: 'Donut Chart'},
  ];

  public getPeriod(boxId: string): string {
    return this.selectedPeriod[this.getPeriodIndex(boxId)];
  }

  public getFrequency(boxId: string): number {
    return this.selectedFrequency[this.getFrequencyIndex(boxId)];
  }

  public getMetric(boxId: string): string {
    return this.selectedMetric[this.getMetricIndex(boxId)];
  }


  public getMetricName(boxId: string): string {
    let metric = this.selectedMetric[this.getMetricIndex(boxId)];
    for (const item of this.metrics) {
      if (item.id === metric) {
        return item.name;
      }
    }
    return metric;
  }

  public getType(boxId: string): string {
    // @ts-ignore
    return this.boxesTypeValue.get(boxId);
  }

  public getFrequencyIndex(boxId: string, defaultValue: number = 60) {
    let number = this.boxesFrequencyValue.get(boxId);
    if (number === undefined) {
      this.selectedFrequency.push(defaultValue);
      let key = this.selectedFrequency.length - 1;
      this.boxesFrequencyValue.set(boxId, key);
      return key;
    }
    return number;
  }

  public getPeriodIndex(boxId: string, defaultValue: string = 'today') {
    let number = this.boxesPeriodValue.get(boxId);
    if (number === undefined) {
      this.selectedPeriod.push(defaultValue);
      let key = this.selectedPeriod.length - 1;
      this.boxesPeriodValue.set(boxId, key);
      return key;
    }
    return number;
  }

  public getMetricIndex(boxId: string, defaultMetric: string = 'hostName') {
    let number = this.boxesMetricValue.get(boxId);
    if (number === undefined) {
      this.selectedMetric.push(defaultMetric);
      let key = this.selectedMetric.length - 1;
      this.boxesMetricValue.set(boxId, key);
      return key;
    }
    return number;
  }

  public setMetric(boxId: string, metric: string) {
    this.selectedMetric[this.getMetricIndex(boxId)] = metric;
  }

  public setPeriod(boxId: string, period: string) {
    this.selectedPeriod[this.getPeriodIndex(boxId)] = period;
  }

  public setFrequency(boxId: string, frequency: number) {
    this.selectedFrequency[this.getFrequencyIndex(boxId)] = frequency;
  }

  public registerBoxRefresh(boxId) {
    let service = this.services.get(this.getType(boxId));
    this.unregisterBoxRefresh(boxId);
    let frequency = this.getFrequency(boxId) * 1000;
    let timerBox = timer(0, frequency).pipe(
      map(() => {
        service.refresh(boxId, this);
      })
    ).subscribe();
    this.boxesSubscription.set(boxId, timerBox);
  }

  public unregisterBoxRefresh(boxId) {
    let subscription = this.boxesSubscription.get(boxId);
    if (subscription !== undefined) {
      subscription.unsubscribe();
    }
  }

  public removeBox(boxId) {
    this.unregisterBoxRefresh(boxId);
    this.removedBoxes.push(boxId);
  }

  public unregisterAllBoxRefresh() {
    for (const subscription of this.boxesSubscription.values()) {
      subscription.unsubscribe();
    }
  }

  public resetAllInfo() {
    this.unregisterAllBoxRefresh();
    this.boxesPeriodValue = new Map<string, number>();
    this.boxesFrequencyValue = new Map<string, number>();
    this.boxesMetricValue = new Map<string, number>();
    this.boxesTypeValue = new Map<string, string>();
    this.boxesSubscription = new Map<string, Subscription>();
    this.services = new Map<string, any>();
    this.selectedPeriod = [];
    this.selectedFrequency = [];
    this.selectedMetric = [];
    this.registredBoxes = [];
    this.registredPieBoxes = [];
    this.lines = [];
    this.removedBoxes = [];
  }

  public registerServices(type: string, service) {
    this.services.set(type, service);
  }

  public addBox(){
    this.registerBox(this.metricAdd, this.typeAdd, this.periodAdd, this.frequencyAdd);
  }

  public registerBox(metric: string = 'hostName', type: string = 'pie', period: string = 'today', frequency: number = 60) {
    let boxId;
    if (type === 'pie') {
      boxId = type + '-' + (this.registredPieBoxes.length + 1);
    } else {
      boxId = type + '-' + (this.registredBoxes.length + 1);
    }
    this.boxesTypeValue.set(boxId, type);
    this.getMetricIndex(boxId, metric);
    this.getPeriodIndex(boxId, period);
    this.getFrequencyIndex(boxId, frequency);
    this.registerBoxRefresh(boxId);
    if (type === 'pie') {
      if (this.registredPieBoxes.length % 2 === 0) {
        let boxIdSecond = type + '-' + (this.registredPieBoxes.length + 2);
        this.lines.push(new Line(type, boxId, boxIdSecond));
      }
      this.registredPieBoxes.push(boxId);
    } else {
      this.lines.push(new Line(type, boxId));
    }
    this.registredBoxes.push(boxId);
  }

  public visible(boxId: string): boolean {
    return this.registredBoxes.indexOf(boxId) !== -1 && this.removedBoxes.indexOf(boxId) === -1;
  }
}
