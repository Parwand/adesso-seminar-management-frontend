import { TestBed } from '@angular/core/testing';

import { SeminarraumService } from './seminarraum.service';

describe('SeminarraumService', () => {
  let service: SeminarraumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeminarraumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
