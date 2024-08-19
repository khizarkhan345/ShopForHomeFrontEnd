import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WishlistDataService {

  private URL = "http://localhost:8080/api/wishlist";

  constructor(private httpClient: HttpClient) { }


  getAllWishlistItems(id: string): Observable<any> {
    return this.httpClient.get<any[]>(this.URL+`/wishlistItems/${id}`);
  }


  addItemToWishlist(WishlistData: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.URL+'/save', WishlistData, { headers });
   }

   removeItemFromWishlist(wishlistData: any, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.put<any>(this.URL+`/${id}`, wishlistData, {headers});
   }

   
}

