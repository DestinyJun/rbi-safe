import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsBarCircleComponent } from './echarts-bar-circle.component';

describe('EchartsBarCircleComponent', () => {
  let component: EchartsBarCircleComponent;
  let fixture: ComponentFixture<EchartsBarCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsBarCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsBarCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
