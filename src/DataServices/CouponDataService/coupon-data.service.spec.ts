import { TestBed } from '@angular/core/testing';

import { CouponDataService } from './coupon-data.service';

describe('CouponDataService', () => {
  let service: CouponDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
