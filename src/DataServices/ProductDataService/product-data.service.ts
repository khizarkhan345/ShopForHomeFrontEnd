import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './../../Model/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductdataService {

  private URL = "http://localhost:8080/api/product";

  constructor(private httpClient: HttpClient) { }


  getAllProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL+'/all');
  }


  getASingleProduct(id: string): Observable<any> {
    return this.httpClient.get<any[]>(this.URL+`/${id}`);
  }


  addProduct(product: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.URL+'/save', product, { headers });
   }

   editProduct(product: any, id: string): Observable<any> {

    //console.log
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.put<any>(this.URL+`/${id}`, product, { headers });
    
   }

   deleteProduct(id: String): Observable<any> {
    return this.httpClient.delete<any>(this.URL+`/${id}`);
   }
}
