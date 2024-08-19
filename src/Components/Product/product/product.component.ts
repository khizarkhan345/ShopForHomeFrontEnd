import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartDataService } from '../../../DataServices/CartDataService/cartdata.service';
import { USER_TOKEN } from '../../../DataServices/UserDataService/userdata.service';
import { WishlistDataService } from '../../../DataServices/WishlistDataService/wishlist-data.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input() product: any;

  quantity: number = 1;

  constructor(private cartService: CartDataService, private wishlistService: WishlistDataService){

  }

  addToCart(productId: string){
    const token = localStorage.getItem(USER_TOKEN);

    let cart: any = {};
    if(token){
       cart = JSON.parse(token).cart;
    }
   

    const cartData = {
       cart: cart,
       productId: productId,
       quantity: this.quantity
    }

    this.cartService.addItemToCart(cartData).subscribe(
      (response) => {
        console.log("Item added to cart", response);
      },
      (error) => {
        console.log("Failed to add item to cart", error);
      }
    )
   console.log(productId);
  }

  addToWishlist(productId: string){
    console.log(productId);
    const token = localStorage.getItem(USER_TOKEN);

    let wishlistId: string = "";
    if(token){
      wishlistId = JSON.parse(token).wishlistId;
    }

    let wishlistData = {
      wishlistId: wishlistId,
      productId: productId
    }
    this.wishlistService.addItemToWishlist(wishlistData).subscribe(
      (response) => {
       console.log("Item added to wishlist", response);
      },
      (error) => {
        console.log("Error", error);
      }
    )
  }
}
