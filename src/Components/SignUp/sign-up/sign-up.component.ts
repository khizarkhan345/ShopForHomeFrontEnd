import { Component } from '@angular/core';
import { User } from '../../../Model/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { UserdataService } from '../../../DataServices/UserDataService/userdata.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  
  model: User;

  errorMessage!: string;

  roles: string[] = ["admin", "customer"];

  constructor(private userService: UserdataService, private router: Router){
    this.model = new User("", "", "", "", "");
  }

  onSubmit(userForm: any){
    console.log(userForm.value);

    if(userForm.value.firstName === "" || userForm.value.lastName === "" || userForm.value.email === ""
      || userForm.value.password === "" || userForm.value.role === ""
    ){

      this.errorMessage="Input field must not be null";
      setTimeout(() => {
         this.errorMessage = "";
      }, 2000);

    }else{
    this.userService.getASingleUserByEmail(userForm.value.email).subscribe(
      (response) => {
       console.log("response", response);
       if(!response){
        this.userService.addUser(userForm.value).subscribe(
          (response) => {
            console.log('Sign Up Successfull', response);
            //this.employees.push(response);
            this.router.navigate(["/login"]);
          },
          (error) => {
            console.log('Sign Up Failed', error);
          }
        );
       }else{
        this.errorMessage = "User with this email already exist";
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
        console.log("User with this email already exist");
       }
      },
      (error) => {
        console.log(error);
      }
    )
    
   }
  }
}
