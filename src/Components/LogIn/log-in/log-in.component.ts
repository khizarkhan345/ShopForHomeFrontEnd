import { Component } from '@angular/core';
import { LogIn } from '../../../Model/LogIn';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserdataService } from '../../../DataServices/UserDataService/userdata.service';
import { Router, RouterLink } from '@angular/router';
import { USER_TOKEN } from '../../../DataServices/UserDataService/userdata.service';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
   
  model: LogIn;
 
  errorMessage!: string;

  roles: string[] = ["admin", "customer"];

  constructor(private userService: UserdataService, private router: Router) {
    this.model = new LogIn("", "", "");
  }

  onSubmit(logInForm: any){
    console.log(logInForm.value);

    if(logInForm.value.email === "" || logInForm.value.password === ""
      || logInForm.value.role === ""
    ){

      this.errorMessage = "Input field must not be null";

      setTimeout(() => {
        this.errorMessage = "";
      }, 2000);

    }else {

    let userData = {
      email: logInForm.value.email,
      password: logInForm.value.password
    }
    this.userService.authenticateUser(userData).subscribe(
      (response) => {
       console.log("response", response);
       if(response){
        console.log(response);   
          if(response.role.toLowerCase() === 'admin'){
             const userData:any = {
            userId: response.userId,
            email: response.email,
            role: response.role,
            jwtToken: response.token
          }

          this.userService.login(userData);
            this.router.navigate(["/users"]);
          }else{
            const userData:any = {
              userId: response.userId,
              email: response.email,
              role: response.role,
              cart: response.cart,
              coupons: response.coupon,
              wishlistId: response.wishlist.wishlistId,
              jwtToken: response.token
            }
            this.userService.login(userData);
            this.router.navigate(["/home"]);
          }
          
       }else{
        this.errorMessage = "Invalid Credentials";
        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
        
       }
      },
      (error) => {
        console.log(error);
      }
    )

  }
  }
}
