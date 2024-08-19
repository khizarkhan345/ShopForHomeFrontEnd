import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponDataService } from '../../../DataServices/CouponDataService/coupon-data.service';
@Component({
  selector: 'app-display-coupons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-coupons.component.html',
  styleUrl: './display-coupons.component.css'
})
export class DisplayCouponsComponent implements OnInit {

  coupons: any[] = [];
  constructor(private couponService: CouponDataService){

  }

  ngOnInit(): void {
    this.couponService.getAllCoupons().subscribe(
      (response) => {
       console.log("All Coupons", response);
       this.coupons = response;
      },
      (error) => {
        console.log("Error fetching coupons", error);
      }
    )
  }

  deleteCoupon(couponId: string){
    console.log(couponId);
    this.couponService.deleteCoupon(couponId).subscribe(
      (response) => {
        console.log("Coupon Deleted", response);
      },
      (error) => {
        console.log("Error deleting coupon", error);
      }
    )
  }
}
