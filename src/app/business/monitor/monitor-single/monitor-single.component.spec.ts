import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSingleComponent } from './monitor-single.component';

describe('MonitorSingleComponent', () => {
  let component: MonitorSingleComponent;
  let fixture: ComponentFixture<MonitorSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
