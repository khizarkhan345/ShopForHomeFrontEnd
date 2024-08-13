import { Component } from '@angular/core';
import { LogIn } from '../../../Model/LogIn';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
   
  model: LogIn;

  constructor() {
    this.model = new LogIn("", "", ["Admin", "Customer"]);
  }

  onSubmit(logInForm: any){
    console.log(logInForm);
  }
}
