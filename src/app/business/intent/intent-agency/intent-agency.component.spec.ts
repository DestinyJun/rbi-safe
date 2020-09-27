import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentAgencyComponent } from './intent-agency.component';

describe('IntentAgencyComponent', () => {
  let component: IntentAgencyComponent;
  let fixture: ComponentFixture<IntentAgencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentAgencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
