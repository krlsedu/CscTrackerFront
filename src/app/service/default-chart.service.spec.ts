import {TestBed} from '@angular/core/testing';

import {DefaultChartService} from './default-chart.service';

describe('DefaultChartService', () => {
  let service: DefaultChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
