import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMainComponent } from './equipment-main.component';

describe('EquipmentMainComponent', () => {
  let component: EquipmentMainComponent;
  let fixture: ComponentFixture<EquipmentMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
