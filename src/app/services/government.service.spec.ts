import { TestBed } from '@angular/core/testing';

import { GovernmentService } from './government.service';

describe('GovernmentService', () => {
  let service: GovernmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovernmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
