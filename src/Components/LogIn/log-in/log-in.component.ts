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
 
  error!: string;

  constructor(private userService: UserdataService, private router: Router) {
    this.model = new LogIn("", "", ["Admin", "Customer"]);
  }

  onSubmit(logInForm: any){
    console.log(logInForm.value);

    this.userService.getASingleUserByEmail(logInForm.value.email).subscribe(
      (response) => {
       console.log("response", response);
       if(response){
        console.log(response);
        if(response.password === logInForm.value.password && response.role.toLowerCase() === logInForm.value.role.toLowerCase()){
          const userData:any = {
            userId: response.userId,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            role: response.role,
            cartId: response.cartId,
            wishlistId: response.wishlistId,
          }

          this.userService.login(userData);
          if(response.role.toLowerCase() === 'admin'){
            this.router.navigate(["/users"]);
          }else{
            this.router.navigate(["/home"]);
          }
          
        }else{
          this.error = "Invalid Password";
          setTimeout(() => {
            this.error = "";
          }, 2000);
        }
       }else{
        this.error = "Invalid Email";
        setTimeout(() => {
          this.error = "";
        }, 2000);
        //console.log("User with this email already exist");
       }
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
