import { TestBed } from '@angular/core/testing';

import { NotfoundService } from './notfound.service';

describe('NotfoundService', () => {
  let service: NotfoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotfoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
