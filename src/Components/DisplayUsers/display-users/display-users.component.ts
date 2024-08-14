import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserdataService } from '../../../DataServices/UserDataService/userdata.service';
@Component({
  selector: 'app-display-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './display-users.component.html',
  styleUrl: './display-users.component.css'
})
export class DisplayUsersComponent implements OnInit {

   users: any[] = [];

   constructor(private userService: UserdataService, private router: Router){

   }
  ngOnInit(): void {
   this.userService.getAllUsers().subscribe(
    data => {
      this.users = data;
      console.log("Users data", this.users);
    },
    error => {
      console.log("Error fetching user data", error);
    }
   )
  }

  editUser(id: string){
    console.log(id);
    this.router.navigate([`/edituser/${id}`]);
  }

  deleteUser(id: string){
    console.log(id);
    this.userService.deleteUser(id).subscribe(
      response => {
       console.log("User deleted", response);
       this.users = this.users.filter(user => user.userId !== id);
      },
      error => {
        console.log("Failed to delete User", error);
      }
    )
  }

}
