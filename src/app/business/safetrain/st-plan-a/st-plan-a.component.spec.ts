import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StPlanAComponent } from './st-plan-a.component';

describe('StPlanAComponent', () => {
  let component: StPlanAComponent;
  let fixture: ComponentFixture<StPlanAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StPlanAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StPlanAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
