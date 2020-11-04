import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsBarDimensionalComponent } from './echarts-bar-dimensional.component';

describe('EchartsBarDimensionalComponent', () => {
  let component: EchartsBarDimensionalComponent;
  let fixture: ComponentFixture<EchartsBarDimensionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsBarDimensionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsBarDimensionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
