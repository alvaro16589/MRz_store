import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rolUserGuard } from './rol-user.guard';

describe('rolUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rolUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
