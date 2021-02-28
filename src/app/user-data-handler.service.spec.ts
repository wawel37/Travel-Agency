import { TestBed } from '@angular/core/testing';

import { UserDataHandlerService } from './user-data-handler.service';

describe('UserDataHandlerService', () => {
  let service: UserDataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
