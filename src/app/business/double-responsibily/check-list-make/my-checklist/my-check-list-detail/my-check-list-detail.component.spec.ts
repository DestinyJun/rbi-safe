import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCheckListDetailComponent } from './my-check-list-detail.component';

describe('MyCheckListDetailComponent', () => {
  let component: MyCheckListDetailComponent;
  let fixture: ComponentFixture<MyCheckListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCheckListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCheckListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
