import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSpecialComponent } from './equipment-special.component';

describe('EquipmentSpecialComponent', () => {
  let component: EquipmentSpecialComponent;
  let fixture: ComponentFixture<EquipmentSpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentSpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
