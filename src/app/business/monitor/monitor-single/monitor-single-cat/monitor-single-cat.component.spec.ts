import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSingleCatComponent } from './monitor-single-cat.component';

describe('MonitorSingleCatComponent', () => {
  let component: MonitorSingleCatComponent;
  let fixture: ComponentFixture<MonitorSingleCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorSingleCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSingleCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
