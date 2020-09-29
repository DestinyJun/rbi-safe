import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyPlanComponent } from './emergency-plan.component';

describe('EmergencyPlanComponent', () => {
  let component: EmergencyPlanComponent;
  let fixture: ComponentFixture<EmergencyPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
