import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentInvestComponent } from './intent-invest.component';

describe('IntentInvestComponent', () => {
  let component: IntentInvestComponent;
  let fixture: ComponentFixture<IntentInvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentInvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
