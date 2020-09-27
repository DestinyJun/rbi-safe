import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentStatusComponent } from './intent-status.component';

describe('IntentStatusComponent', () => {
  let component: IntentStatusComponent;
  let fixture: ComponentFixture<IntentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
