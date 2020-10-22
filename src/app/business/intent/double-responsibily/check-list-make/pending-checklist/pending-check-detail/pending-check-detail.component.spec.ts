import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCheckDetailComponent } from './pending-check-detail.component';

describe('PendingCheckDetailComponent', () => {
  let component: PendingCheckDetailComponent;
  let fixture: ComponentFixture<PendingCheckDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingCheckDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCheckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
