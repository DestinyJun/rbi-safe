import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSafeComponent } from './equipment-safe.component';

describe('EquipmentSafeComponent', () => {
  let component: EquipmentSafeComponent;
  let fixture: ComponentFixture<EquipmentSafeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentSafeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
