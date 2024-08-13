import { Component } from '@angular/core';
import { Category } from '../../../Model/Category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
   model: Category;

   constructor(){
    this.model = new Category("");
   }

   onSubmit(categoryForm: any){
     console.log(categoryForm.value);
   }
}
