import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsBarStackComponent } from './echarts-bar-stack.component';

describe('EchartsBarStackComponent', () => {
  let component: EchartsBarStackComponent;
  let fixture: ComponentFixture<EchartsBarStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsBarStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsBarStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
