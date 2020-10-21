import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetingSpiComponent } from './seting-spi.component';

describe('SetingSpiComponent', () => {
  let component: SetingSpiComponent;
  let fixture: ComponentFixture<SetingSpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetingSpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetingSpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
