import { Component } from '@angular/core';
import { LogIn } from '../../../Model/LogIn';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserdataService } from '../../../DataServices/UserDataService/userdata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
    console.log(logInForm);

    this.userService.getASingleUserByEmail(logInForm.value.email).subscribe(
      (response) => {
       console.log("response", response);
       if(response){
        console.log(response);
        if(response.password === logInForm.value.password){
          this.router.navigate(["/sales"]);
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
