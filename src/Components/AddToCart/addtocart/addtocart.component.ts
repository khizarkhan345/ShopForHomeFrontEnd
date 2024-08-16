import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../../../DataServices/CartDataService/cartdata.service';
import { USER_TOKEN } from '../../../DataServices/UserDataService/userdata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartitemComponent } from '../../CartItem/cartitem/cartitem.component';
@Component({
  selector: 'app-addtocart',
  standalone: true,
  imports: [FormsModule, CommonModule, CartitemComponent],
  templateUrl: './addtocart.component.html',
  styleUrl: './addtocart.component.css'
})
export class AddtocartComponent implements OnInit{

     CartData: any = {};

     isEditEnabled: boolean = false;

     newQuantity: number = 0;
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

    

}
