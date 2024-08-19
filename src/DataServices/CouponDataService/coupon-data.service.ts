import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CouponDataService {

  private URL = "http://localhost:8080/api/coupon";

  constructor(private httpClient: HttpClient) { }


  getAllCoupons(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL+'/all');
  }


  createCoupon(coupon: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.URL+'/save', coupon, { headers });
   }

   

   deleteCoupon(id: String): Observable<any> {
    return this.httpClient.delete<any>(this.URL+`/${id}`);
   }

}
