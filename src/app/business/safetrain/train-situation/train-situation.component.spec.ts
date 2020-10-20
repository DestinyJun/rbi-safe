import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainSituationComponent } from './train-situation.component';

describe('TrainSituationComponent', () => {
  let component: TrainSituationComponent;
  let fixture: ComponentFixture<TrainSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
