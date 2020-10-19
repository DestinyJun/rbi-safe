import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionMainComponent } from './institution-main.component';

describe('InstitutionMainComponent', () => {
  let component: InstitutionMainComponent;
  let fixture: ComponentFixture<InstitutionMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});