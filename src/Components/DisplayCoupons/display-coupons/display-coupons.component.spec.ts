import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCouponsComponent } from './display-coupons.component';

describe('DisplayCouponsComponent', () => {
  let component: DisplayCouponsComponent;
  let fixture: ComponentFixture<DisplayCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCouponsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
