import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private URL = "http://localhost:8080/api/user";

  constructor(private httpClient: HttpClient) { }


  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL+'/all');
  }


  getASingleUser(id: string): Observable<any> {
    return this.httpClient.get<any[]>(this.URL+`/${id}`);
  }

  getASingleUserByEmail(email: string): Observable<any> {
    return this.httpClient.get<any[]>(this.URL+`/userbyemail/${email}`);
  }

  addUser(user: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.URL+'/save', user, { headers });
   }

   editUser(user: any, id: string): Observable<any> {

    //console.log
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.put<any>(this.URL+`/${id}`, user, { headers });
    
   }

   deleteUser(id: String): Observable<any> {
    return this.httpClient.delete<any>(this.URL+`/${id}`);
   }
}
