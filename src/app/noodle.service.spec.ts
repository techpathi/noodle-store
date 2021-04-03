import { TestBed } from '@angular/core/testing';

import { NoodleService } from './noodle.service';

describe('NoodleService', () => {
  let service: NoodleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoodleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
