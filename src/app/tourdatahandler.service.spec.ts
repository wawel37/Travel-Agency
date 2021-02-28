import { TestBed } from '@angular/core/testing';

import { TourdatahandlerService } from './tourdatahandler.service';

describe('TourdatahandlerService', () => {
  let service: TourdatahandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourdatahandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
