import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../../../DataServices/CartDataService/cartdata.service';
import { USER_TOKEN } from '../../../DataServices/UserDataService/userdata.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-addtocart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addtocart.component.html',
  styleUrl: './addtocart.component.css'
})
export class AddtocartComponent implements OnInit{

     CartData: any = {};
     constructor(private cartService: CartDataService){

     }

     ngOnInit(): void {
        const token = localStorage.getItem(USER_TOKEN);
       
        if(token){
          console.log(JSON.parse(token));
          const cartId = JSON.parse(token).cartId;
          console.log(cartId);
          this.cartService.getAllCartItems(cartId).subscribe(
            (response) => {
              console.log(response);
              this.CartData = response;
            },
            (error) => {
              console.log(error);
            }
          );
        }
        
     }

     handleCheck(){
      console.log("Handle Checkout is clicked");
     }

     editCartItem(id: string){
      console.log(id);
     }

     deleteCartItem(id: string){
      console.log(id);
     }

}
