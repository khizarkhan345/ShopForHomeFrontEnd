import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_TOKEN } from '../DataServices/UserDataService/userdata.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Get the JWT token from local storage or your authentication service
  const token = localStorage.getItem(USER_TOKEN); // Adjust this based on where your token is stored

  if (token) {
    // Clone the request and set the Authorization header with the JWT token
    const jwtToken = JSON.parse(token).jwtToken;
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`
      }
    });

    // Pass the cloned request instead of the original request to the next handler
    return next(clonedRequest);
  } else {
    // If no token, pass the original request
    return next(req);
  }
};
