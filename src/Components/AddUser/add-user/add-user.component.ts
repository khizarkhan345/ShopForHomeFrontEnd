import { Component, OnInit } from '@angular/core';
import { User } from '../../../Model/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserdataService } from '../../../DataServices/UserDataService/userdata.service';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
    model: User;
   
    userId!: string;
    user!: any;
    constructor(private userService: UserdataService, private router: Router, private route: ActivatedRoute){
      this.model = new User('', '', '', '', ["admin", "customer"]);
    }

   ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || 'Not Found';
    //console.log(this.route.snapshot.paramMap.get('id'));

    if(this.userId){
      this.userService.getASingleUser(this.userId).subscribe(
        response => {
          console.log("Single Category", response);
          this.user = response;
  
          if(this.user){
            this.model = new User(this.user.firstName, this.user.lastName, this.user.email, this.user.password, this.user.role);
          }
        },
        error => {
          console.log("Fetching Single Category failed", error);
        });
    }
   
    
   }
 
    onSubmit(userForm: any){
      console.log(userForm.value);

      if(this.user){
      
        this.userService.editUser(userForm.value, this.userId).subscribe(
          (response) => {
            console.log('User Updated', response);
            //this.employees.push(response);
            this.router.navigate(["/users"]);
          },
          (error) => {
            console.log('User Updation failed', error);
          }
        );
       }else{
        this.userService.addUser(userForm.value).subscribe(
          (response) => {
            console.log('Category Saved', response);
            //this.employees.push(response);
            this.router.navigate(["/users"]);
          },
          (error) => {
            console.log('Category saving failed', error);
          }
        );
       }
    }
}
