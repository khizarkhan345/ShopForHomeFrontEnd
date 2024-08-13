import { Component } from '@angular/core';
import { User } from '../../../Model/User';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
    model: User;

    constructor(){
      this.model = new User('', '', '', '', ["admin", "customer"]);
    }

    onSubmit(userForm: any){
      console.log(userForm.value);
    }
}
