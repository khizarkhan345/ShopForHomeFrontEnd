import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export const USER_TOKEN = "user_token";
@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private loggedIn = new BehaviorSubject<boolean>(false); 
  private userRole = new BehaviorSubject<string>('guest'); 

  private jwtToken = new BehaviorSubject<string>('');

  currentUserRole = this.userRole.asObservable();
  isLoggedIn = this.loggedIn.asObservable();
  
  private URL = "http://localhost:8080/api/user";

  private authURL =  "http://localhost:8080/api/auth";

  constructor(private httpClient: HttpClient, private router: Router) {
    const userData = JSON.parse(localStorage.getItem(USER_TOKEN) || '{}');
    if (userData.userId) {
      this.loggedIn.next(true);
      this.userRole.next(userData.role || 'guest');
      this.jwtToken.next(userData.jwtToken);
    }
   }


  getAllUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.URL+'/all');
  }


  getASingleUser(id: string): Observable<any> {
    return this.httpClient.get<any[]>(this.URL+`/${id}`);
  }

  getASingleUserByEmail(email: any): Observable<any> {
    return this.httpClient.get<any[]>(this.URL+`/userbyemail/${email}`);
  }

  authenticateUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any[]>(this.authURL+"/login", userData, {headers});
  }

  addUser(user: any): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.authURL+'/signup', user, { headers });
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
