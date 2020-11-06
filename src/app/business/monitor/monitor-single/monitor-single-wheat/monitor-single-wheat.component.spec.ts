import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSingleWheatComponent } from './monitor-single-wheat.component';

describe('MonitorSingleWheatComponent', () => {
  let component: MonitorSingleWheatComponent;
  let fixture: ComponentFixture<MonitorSingleWheatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSingleWheatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSingleWheatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
