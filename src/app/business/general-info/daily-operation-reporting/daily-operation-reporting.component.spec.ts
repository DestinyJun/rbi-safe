import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOperationReportingComponent } from './daily-operation-reporting.component';

describe('DailyOperationReportingComponent', () => {
  let component: DailyOperationReportingComponent;
  let fixture: ComponentFixture<DailyOperationReportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyOperationReportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyOperationReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
