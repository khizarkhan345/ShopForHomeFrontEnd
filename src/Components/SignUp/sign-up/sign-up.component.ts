import { Component } from '@angular/core';
import { User } from '../../../Model/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  
  model: User;

  constructor(){
    this.model = new User("", "", "", "", ["admin", "customer"]);
  }

  onSubmit(userForm: any){
    console.log(userForm.value);
  }
}
