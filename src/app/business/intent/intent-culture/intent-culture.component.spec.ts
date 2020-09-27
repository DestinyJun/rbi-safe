import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentCultureComponent } from './intent-culture.component';

describe('IntentCultureComponent', () => {
  let component: IntentCultureComponent;
  let fixture: ComponentFixture<IntentCultureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentCultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
