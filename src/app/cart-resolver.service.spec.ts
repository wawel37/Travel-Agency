import { TestBed } from '@angular/core/testing';

import { CartResolverService } from './cart-resolver.service';

describe('CartResolverService', () => {
  let service: CartResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
