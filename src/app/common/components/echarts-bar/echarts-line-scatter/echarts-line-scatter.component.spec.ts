import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsLineScatterComponent } from './echarts-line-scatter.component';

describe('EchartsLineScatterComponent', () => {
  let component: EchartsLineScatterComponent;
  let fixture: ComponentFixture<EchartsLineScatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsLineScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsLineScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
