import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleResponsibilyComponent } from './double-responsibily.component';

describe('DoubleResponsibilyComponent', () => {
  let component: DoubleResponsibilyComponent;
  let fixture: ComponentFixture<DoubleResponsibilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleResponsibilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleResponsibilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
