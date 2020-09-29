import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencySituationComponent } from './emergency-situation.component';

describe('EmergencySituationComponent', () => {
  let component: EmergencySituationComponent;
  let fixture: ComponentFixture<EmergencySituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencySituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencySituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
