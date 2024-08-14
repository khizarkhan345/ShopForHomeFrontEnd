import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {

  private URL = "http://localhost:8080/api/category";

  constructor(private httpClient: HttpClient) { }


  getAllCategories(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL+'/all');
  }


  getASingleCategory(id: string): Observable<any> {
    return this.httpClient.get<any[]>(this.URL+`/${id}`);
  }


  addCategory(category: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.URL+'/save', category, { headers });
   }

   editCategory(category: any, id: string): Observable<any> {

    //console.log
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.put<any>(this.URL+`/${id}`, category, { headers });
    
   }

   deleteCategory(id: String): Observable<any> {
    return this.httpClient.delete<any>(this.URL+`/${id}`);
   }

}
