import { TestBed } from '@angular/core/testing';

import { SessiontokenService } from './sessiontoken.service';

describe('SessiontokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessiontokenService = TestBed.get(SessiontokenService);
    expect(service).toBeTruthy();
  });
});
