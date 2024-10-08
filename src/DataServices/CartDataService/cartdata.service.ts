import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  private URL = "http://localhost:8080/api/cart";

  constructor(private httpClient: HttpClient) { }


  getAllCartItems(id: string): Observable<any> {
    return this.httpClient.get<any[]>(this.URL+`/cartItems/${id}`);
  }


  // getASingleCategory(id: string): Observable<any> {
  //   return this.httpClient.get<any[]>(this.URL+`/${id}`);
  // }


  addItemToCart(cartData: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.URL+'/cartItem/save', cartData, { headers });
   }

   removeItemFromCart(id: string): Observable<any> {
    return this.httpClient.delete<any>(this.URL+`/cartItem/${id}`);
   }

   editCartItem(id: string, updateData: any): Observable<any> {
     //console.log
     const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.put<any>(this.URL+`/cartItem/${id}`, updateData, { headers});
   }

}
