import { TestBed } from '@angular/core/testing';

import { TokenExistGuard } from './token-exist.guard';

describe('TokenExistGuard', () => {
  let guard: TokenExistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenExistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
