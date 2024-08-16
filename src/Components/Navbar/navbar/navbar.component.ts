import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserdataService } from '../../../DataServices/UserDataService/userdata.service';
import { USER_TOKEN } from '../../../DataServices/UserDataService/userdata.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
     isLoggedIn: boolean = false;

     userRole: string = 'guest';

     constructor(private userService: UserdataService){
     
     }


     ngOnInit(): void {
      this.userService.isLoggedIn.subscribe((status: boolean) => {
        this.isLoggedIn = status;
      });
  
      this.userService.currentUserRole.subscribe((role: string) => {
        this.userRole = role;
      });
    }
   

     handleLogOut(){
        this.userService.loggedOut();
     }
}
