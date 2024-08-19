import { Component, OnInit } from '@angular/core';
import { WishlistDataService } from '../../../DataServices/WishlistDataService/wishlist-data.service';
import { FormsModule } from '@angular/forms';
import { WishlistItemComponent } from '../../WishlistItem/wishlist-item/wishlist-item.component';
import { CommonModule } from '@angular/common';
import { USER_TOKEN } from '../../../DataServices/UserDataService/userdata.service';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [FormsModule, CommonModule, WishlistItemComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  WishlistData: any[] = [];

  constructor(private wishlistService: WishlistDataService){

  }

  ngOnInit(): void {
    const token = localStorage.getItem(USER_TOKEN);

    let wishlistId: string = "";
    if(token){
      wishlistId = JSON.parse(token).wishlistId;
    }

    this.wishlistService.getAllWishlistItems(wishlistId).subscribe(
        (response) => {
         console.log("Success", response);
         this.WishlistData = response.products;
        },
        (error) => {
          console.log("Error", error);
        }
    )
    
  }
}
