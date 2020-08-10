import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAProcessedComponent } from './plan-a-processed.component';

describe('PlanAProcessedComponent', () => {
  let component: PlanAProcessedComponent;
  let fixture: ComponentFixture<PlanAProcessedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAProcessedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
