import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListMakeComponent } from './check-list-make.component';

describe('CheckListMakeComponent', () => {
  let component: CheckListMakeComponent;
  let fixture: ComponentFixture<CheckListMakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckListMakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
