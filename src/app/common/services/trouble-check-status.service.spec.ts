import { TestBed } from '@angular/core/testing';

import { TroubleCheckStatusService } from './trouble-check-status.service';

describe('TroubleCheckStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TroubleCheckStatusService = TestBed.get(TroubleCheckStatusService);
    expect(service).toBeTruthy();
  });
});
