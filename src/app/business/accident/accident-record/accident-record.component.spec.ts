import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentRecordComponent } from './accident-record.component';

describe('AccidentRecordComponent', () => {
  let component: AccidentRecordComponent;
  let fixture: ComponentFixture<AccidentRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
