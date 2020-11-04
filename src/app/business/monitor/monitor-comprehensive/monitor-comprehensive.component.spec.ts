import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorComprehensiveComponent } from './monitor-comprehensive.component';

describe('MonitorComprehensiveComponent', () => {
  let component: MonitorComprehensiveComponent;
  let fixture: ComponentFixture<MonitorComprehensiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorComprehensiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorComprehensiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
