import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomizationComponent } from './list-customization.component';

describe('ListCustomizationComponent', () => {
  let component: ListCustomizationComponent;
  let fixture: ComponentFixture<ListCustomizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCustomizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
