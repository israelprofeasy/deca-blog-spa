import { TestBed } from '@angular/core/testing';

import { PrivateAreaGuard } from './private-area.guard';

describe('PrivateAreaGuard', () => {
  let guard: PrivateAreaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrivateAreaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
