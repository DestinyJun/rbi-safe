import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilAppManagerComponent } from './mobil-app-manager.component';

describe('MobilAppManagerComponent', () => {
  let component: MobilAppManagerComponent;
  let fixture: ComponentFixture<MobilAppManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilAppManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilAppManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
