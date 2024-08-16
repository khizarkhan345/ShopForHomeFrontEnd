import { Component, Input } from '@angular/core';
import { CartDataService } from '../../../DataServices/CartDataService/cartdata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: '[app-cartitem]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartitem.component.html',
  styleUrl: './cartitem.component.css'
})
export class CartitemComponent {

   @Input() CartItem: any = {};

   newQuantity: number = 1;

   isEditEnabled: boolean = false;
   constructor(private cartService: CartDataService){

   }

   editCartItem(id: string){
    this.isEditEnabled = true;
    console.log(id);
   }

   deleteCartItem(id: string){
    this.cartService.removeItemFromCart(id).subscribe(
      (response) => {
        //this.CartData = this.CartData.filter((data: any) => data.cartItemId !== id);
        console.log("Item deleted from cart", response);
      },
      (error) => {
        console.log("Failed to delete item from cart", error);
      }
    )
    console.log(id);
   }

   handleUpdate(id: string){
    console.log(this.newQuantity);
    const updateData = {
      newQuantity: this.newQuantity
    };

    this.cartService.editCartItem(id, updateData).subscribe(
      (response) => {
         console.log("Quantity updated", response);
      },
      (error) => {
       console.log("Failed to update quantity", error);
      }
    )
    this.isEditEnabled = false;
   }
}
