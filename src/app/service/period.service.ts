import {Injectable} from '@angular/core';
// @ts-ignore
import {Subscription} from "rxjs/src/internal/Subscription";
import {map, timer} from "rxjs";

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

  public periods = [
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
        service.refresh(boxId,this);
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

  public unregisterAllBoxRefresh() {
    for (const subscription of this.boxesSubscription.values()) {
      subscription.unsubscribe();
    }
  }

  public registerServices(type: string, service) {
    this.services.set(type, service);
  }

  public registerBox(boxId: string, defaultMetric: string = 'hostName', defaultType: string = 'pie', defaultPeriod: string = 'today', defaultFrequency: number = 60) {
    this.boxesTypeValue.set(boxId, defaultType);
    this.getMetricIndex(boxId, defaultMetric);
    this.getPeriodIndex(boxId, defaultPeriod);
    this.getFrequencyIndex(boxId, defaultFrequency);
    this.registerBoxRefresh(boxId);
  }
}
