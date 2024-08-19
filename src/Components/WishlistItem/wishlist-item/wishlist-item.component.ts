import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishlistDataService } from '../../../DataServices/WishlistDataService/wishlist-data.service';
import { USER_TOKEN } from '../../../DataServices/UserDataService/userdata.service';
@Component({
  selector: '[app-wishlist-item]',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wishlist-item.component.html',
  styleUrl: './wishlist-item.component.css'
})
export class WishlistItemComponent {
    
  @Input() product: any = {};

  constructor(private wishlistService: WishlistDataService){

  }

  deleteWishlistItem(productId: string){
    const token = localStorage.getItem(USER_TOKEN);

    let wishlistId: string = "";
    if(token){
      wishlistId = JSON.parse(token).wishlistId;
    }

    let wishlistData = {
      productId: productId
    }

    this.wishlistService.removeItemFromWishlist(wishlistData, wishlistId).subscribe(
      (response) => {
        console.log("Successfully removed item from wishlist", response);
      },
      (error) => {
        console.log("Error removing item from wishlist",error);
      }
    )
    console.log(productId);
  }
}
