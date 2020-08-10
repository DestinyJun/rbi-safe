import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAUnprocessedComponent } from './plan-a-unprocessed.component';

describe('PlanAUnprocessedComponent', () => {
  let component: PlanAUnprocessedComponent;
  let fixture: ComponentFixture<PlanAUnprocessedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAUnprocessedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAUnprocessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
