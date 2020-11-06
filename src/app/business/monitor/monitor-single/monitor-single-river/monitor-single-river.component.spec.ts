import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSingleRiverComponent } from './monitor-single-river.component';

describe('MonitorSingleRiverComponent', () => {
  let component: MonitorSingleRiverComponent;
  let fixture: ComponentFixture<MonitorSingleRiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSingleRiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSingleRiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
