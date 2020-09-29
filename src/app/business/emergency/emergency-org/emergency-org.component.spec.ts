import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyOrgComponent } from './emergency-org.component';

describe('EmergencyOrgComponent', () => {
  let component: EmergencyOrgComponent;
  let fixture: ComponentFixture<EmergencyOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
