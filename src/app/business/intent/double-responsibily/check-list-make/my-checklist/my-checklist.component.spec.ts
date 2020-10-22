import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChecklistComponent } from './my-checklist.component';

describe('MyChecklistComponent', () => {
  let component: MyChecklistComponent;
  let fixture: ComponentFixture<MyChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
