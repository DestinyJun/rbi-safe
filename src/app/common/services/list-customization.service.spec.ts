import { TestBed } from '@angular/core/testing';

import { ListCustomizationService } from './list-customization.service';

describe('ListCustomizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListCustomizationService = TestBed.get(ListCustomizationService);
    expect(service).toBeTruthy();
  });
});
