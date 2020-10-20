import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsAreaChartComponent } from './echarts-area-chart.component';

describe('EchartsAreaChartComponent', () => {
  let component: EchartsAreaChartComponent;
  let fixture: ComponentFixture<EchartsAreaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsAreaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
