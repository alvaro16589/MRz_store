import { TestBed } from '@angular/core/testing';

import { StateProdService } from './state-prod.service';

describe('StateProdService', () => {
  let service: StateProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
