import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionManageComponent } from './institution-manage.component';

describe('InstitutionManageComponent', () => {
  let component: InstitutionManageComponent;
  let fixture: ComponentFixture<InstitutionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
