import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserdataService } from '../DataServices/UserDataService/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private userService: UserdataService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.getUserRole().toLowerCase() === 'customer') {
      return true;
    }
    //this.router.navigate(['/login']);
    return false;
  }
}