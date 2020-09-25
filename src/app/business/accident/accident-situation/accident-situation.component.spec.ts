import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentSituationComponent } from './accident-situation.component';

describe('AccidentSituationComponent', () => {
  let component: AccidentSituationComponent;
  let fixture: ComponentFixture<AccidentSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
