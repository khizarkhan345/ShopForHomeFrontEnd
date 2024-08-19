import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../../../DataServices/CartDataService/cartdata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { USER_TOKEN } from '../../../DataServices/UserDataService/userdata.service';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  CartData: any[] = [];

  totalValue: number = 0;
  constructor(private cartService: CartDataService){

  }

  ngOnInit(): void {
    const token = localStorage.getItem(USER_TOKEN);
       
        if(token){
          console.log(JSON.parse(token));
          const cartId = JSON.parse(token).cart.cartId;
          
          this.cartService.getAllCartItems(cartId).subscribe(
            (response) => {
              console.log(response);
              this.CartData = response;
              this.CartData.forEach((element: any) => {
                this.totalValue = this.totalValue + Number(element.product.price)*Number(element.quantity);
              });
            },
            (error) => {
              console.log(error);
            }
          );
        }

  }

  handleCoupon(){
    console.log("Coupon button is clicked");
  }

  handleOrder(){

  }

}
