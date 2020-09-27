import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentAimsComponent } from './intent-aims.component';

describe('IntentAimsComponent', () => {
  let component: IntentAimsComponent;
  let fixture: ComponentFixture<IntentAimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentAimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentAimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
