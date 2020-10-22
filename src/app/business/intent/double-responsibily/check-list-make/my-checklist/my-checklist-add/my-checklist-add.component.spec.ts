import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChecklistAddComponent } from './my-checklist-add.component';

describe('MyChecklistAddComponent', () => {
  let component: MyChecklistAddComponent;
  let fixture: ComponentFixture<MyChecklistAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChecklistAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChecklistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
