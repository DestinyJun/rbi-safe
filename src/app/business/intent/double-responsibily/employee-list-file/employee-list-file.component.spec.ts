import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListFileComponent } from './employee-list-file.component';

describe('EmployeeListFileComponent', () => {
  let component: EmployeeListFileComponent;
  let fixture: ComponentFixture<EmployeeListFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
