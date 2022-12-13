import { TestBed } from '@angular/core/testing';

import { TrackSearchService } from './track-search.service';

describe('TrackSearchService', () => {
  let service: TrackSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
