import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsBarLineComponent } from './echarts-bar-line.component';

describe('EchartsBarLineComponent', () => {
  let component: EchartsBarLineComponent;
  let fixture: ComponentFixture<EchartsBarLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsBarLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsBarLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
