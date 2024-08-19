import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  private URL = "http://localhost:8080/api/order";

  constructor(private httpClient: HttpClient) { }


  getAllOrders(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL+'/all');
  }


  getASingleOrder(id: string): Observable<any> {
    return this.httpClient.get<any[]>(this.URL+`/${id}`);
  }


  createNewOrder(orderData: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.URL+'/save', orderData, { headers });
   }

  

}
