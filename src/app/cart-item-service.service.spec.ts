import { TestBed } from '@angular/core/testing';

import { CartItemServiceService } from './cart-item-service.service';

describe('CartItemServiceService', () => {
  let service: CartItemServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartItemServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
