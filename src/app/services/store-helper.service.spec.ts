import { TestBed } from '@angular/core/testing';

import { StoreHelperService } from './store-helper.service';

describe('StoreHelperService', () => {
  let service: StoreHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
