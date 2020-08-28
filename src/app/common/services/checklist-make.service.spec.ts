import { TestBed } from '@angular/core/testing';

import { ChecklistMakeService } from './checklist-make.service';

describe('ChecklistMakeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChecklistMakeService = TestBed.get(ChecklistMakeService);
    expect(service).toBeTruthy();
  });
});
