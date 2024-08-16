import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export const USER_TOKEN = "user_token";
@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private loggedIn = new BehaviorSubject<boolean>(false); // Tracks if the user is logged in
  private userRole = new BehaviorSubject<string>('guest'); // Tracks the user's role

  currentUserRole = this.userRole.asObservable();
  isLoggedIn = this.loggedIn.asObservable();
  
  private URL = "http://localhost:8080/api/user";

  constructor(private httpClient: HttpClient, private router: Router) {
    const userData = JSON.parse(localStorage.getItem(USER_TOKEN) || '{}');
    if (userData.userId) {
      this.loggedIn.next(true);
      this.userRole.next(userData.role || 'guest');
    }
   }


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

   public isAuthenticated(): boolean {
    const token = localStorage.getItem(USER_TOKEN);
   
    if(token){
      return true;
    }else{
      return false;
    }
  }

  login(userData: any) {
    localStorage.setItem(USER_TOKEN, JSON.stringify(userData));
    this.loggedIn.next(true);
    this.userRole.next(userData.role || 'guest');
  }

  public loggedOut(): void {
    localStorage.removeItem(USER_TOKEN);
    this.loggedIn.next(false);
    this.userRole.next('guest');
    this.router.navigate(['/login']);
  }
  public getUserRole(): string {
    const token = localStorage.getItem(USER_TOKEN);
    if(token){
      const role = JSON.parse(token).role;
      return role;
    }else{
      return '';
    }
  }
}
