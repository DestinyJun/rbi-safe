import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrInsitutionComponent } from './dr-insitution.component';

describe('DrInsitutionComponent', () => {
  let component: DrInsitutionComponent;
  let fixture: ComponentFixture<DrInsitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrInsitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrInsitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
