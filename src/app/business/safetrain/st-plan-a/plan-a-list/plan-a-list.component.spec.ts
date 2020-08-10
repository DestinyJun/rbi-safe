import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAListComponent } from './plan-a-list.component';

describe('PlanAListComponent', () => {
  let component: PlanAListComponent;
  let fixture: ComponentFixture<PlanAListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanAListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
