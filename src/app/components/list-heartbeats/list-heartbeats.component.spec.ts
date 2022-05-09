import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListHeartbeatsComponent} from './list-heartbeats.component';

describe('ListHeartbeatsComponent', () => {
  let component: ListHeartbeatsComponent;
  let fixture: ComponentFixture<ListHeartbeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHeartbeatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeartbeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
