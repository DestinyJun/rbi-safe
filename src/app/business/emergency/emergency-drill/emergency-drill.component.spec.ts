import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyDrillComponent } from './emergency-drill.component';

describe('EmergencyDrillComponent', () => {
  let component: EmergencyDrillComponent;
  let fixture: ComponentFixture<EmergencyDrillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyDrillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyDrillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
