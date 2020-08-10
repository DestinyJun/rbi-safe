import { TestBed } from '@angular/core/testing';

import { EmployeeListFileService } from './employee-list-file.service';

describe('EmployeeListFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeListFileService = TestBed.get(EmployeeListFileService);
    expect(service).toBeTruthy();
  });
});
