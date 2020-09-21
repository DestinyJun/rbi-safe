import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentOtherComponent } from './equipment-other.component';

describe('EquipmentOtherComponent', () => {
  let component: EquipmentOtherComponent;
  let fixture: ComponentFixture<EquipmentOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
