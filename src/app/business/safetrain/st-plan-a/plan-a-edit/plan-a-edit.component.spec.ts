import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAEditComponent } from './plan-a-edit.component';

describe('PlanAEditComponent', () => {
  let component: PlanAEditComponent;
  let fixture: ComponentFixture<PlanAEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
