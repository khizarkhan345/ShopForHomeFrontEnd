import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Coupon } from '../../../Model/Coupon';
import { UserdataService } from '../../../DataServices/UserDataService/userdata.service';
import { CouponDataService } from '../../../DataServices/CouponDataService/coupon-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.css'
})
export class CouponComponent implements OnInit {

  model: Coupon;

  Users: any[] = [];
  constructor(private userService: UserdataService, private couponService: CouponDataService, private router: Router){
    this.model  = new Coupon("", 0.00, []);
  }

  ngOnInit(): void {
     this.userService.getAllUsers().subscribe(
      (response) => {
         this.Users = response;
         console.log("Users Fetched Successfully!", response);
         this.Users = this.Users.filter(user => user.role === "customer");
      },
      (error) => {
        console.log("Error occurred while fetching users", error);
      }
     )
  }

  toggleSelection(userId: string){
    const index = this.model.userIds.indexOf(userId);

    if(index > -1){
      this.model.userIds.splice(index, 1);
    }else{
      this.model.userIds.push(userId);
    }

  }

  isSelected(userId: string): boolean {
    return this.model.userIds.includes(userId);
  }

  onSubmit(CouponForm: any){
    //console.log(CouponForm.value);
    console.log(this.model);
    this.couponService.createCoupon(this.model).subscribe(
      (response) => {
         console.log("Coupon created Successfully", response);
         this.router.navigate(["/coupons"]);
      },
      (error) => {
        console.log("Unable to create coupon", error);
      }
    )
  }

}
