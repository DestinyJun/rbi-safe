import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsLineNormalComponent } from './echarts-line-normal.component';

describe('EchartsLineNormalComponent', () => {
  let component: EchartsLineNormalComponent;
  let fixture: ComponentFixture<EchartsLineNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EchartsLineNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsLineNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
