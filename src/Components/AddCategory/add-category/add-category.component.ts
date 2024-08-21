import { Component, OnInit } from '@angular/core';
import { Category } from '../../../Model/Category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { myCategory } from '../../../Types/Category';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CategoryDataService } from '../../../DataServices/CategoryDataService/category-data-service';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{
   model: Category;

   categoryId!: string;
   category!: any;

   errorMessage: string = "";

   constructor(private categoryService: CategoryDataService, private router: Router, private route: ActivatedRoute){
    this.model = new Category("");
   }

  ngOnInit(): void {

    this.categoryId = this.route.snapshot.paramMap.get('id') || 'Not Found';
    //console.log(this.route.snapshot.paramMap.get('id'));
    
    if(this.categoryId !== "Not Found"){
      this.categoryService.getASingleCategory(this.categoryId).subscribe(
        response => {
          console.log("Single Category", response);
          this.category = response;
  
          if(this.category){
            this.model = new Category(this.category.categoryName);
          }
        },
        error => {
          console.log("Fetching Single Category failed", error);
        });
    }
    
    

   

   
   
    console.log(this.category);
  }

  

   onSubmit(categoryForm: any){
     console.log(categoryForm.value);

     if(categoryForm.value.categoryName === ""){
      this.errorMessage="Input fields must not be blank!";
      setTimeout(() => {
        this.errorMessage = "";
      }, 2000);
     }else{
      if(this.category){
      
        this.categoryService.editCategory(categoryForm.value, this.categoryId).subscribe(
          (response) => {
            console.log('Category Updated', response);
            //this.employees.push(response);
            this.router.navigate(["/categories"]);
          },
          (error) => {
            console.log('Category Updation failed', error);
          }
        );
       }else{
        this.categoryService.addCategory(categoryForm.value).subscribe(
          (response) => {
            console.log('Category Saved', response);
            //this.employees.push(response);
            this.router.navigate(["/categories"]);
          },
          (error) => {
            console.log('Category saving failed', error);
          }
        );
       }
     }
     
     

     
   }
}
