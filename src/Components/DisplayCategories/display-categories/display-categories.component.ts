import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { myCategory } from '../../../Types/Category';
import { Category } from '../../../Model/Category';
import { Router } from '@angular/router';
import { CategoryDataService } from '../../../DataServices/CategoryDataService/category-data-service';
@Component({
  selector: 'app-display-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './display-categories.component.html',
  styleUrl: './display-categories.component.css'
})
export class DisplayCategoriesComponent implements OnInit{
  
  model: Category;
  Categories: myCategory[] = [];

  constructor(private categoryService: CategoryDataService, private router: Router){
   this.model = new Category("");
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.Categories = data;
        console.log("Data Fetched Successfully", this.Categories);
      },
      error => {
        console.log("Error fetching data", error);
      }
    )
  }


  editCategory(id: string){
    console.log(id);
    let category: any = this.Categories.filter(category => category.categoryId === id);
    this.model = new Category(category[0].categoryName);
    
    this.router.navigate([`/editcategory/${id}`]);

  }

  deleteCategory(id: string){
    console.log(id);
    this.categoryService.deleteCategory(id).subscribe(
      (response) => {
        this.Categories = this.Categories.filter(category => {
          return category.categoryId !== id;
        });
        console.log('Category Deleted', response);
        //this.employees.push(response);
        //this.router.navigate(["/categories"]);
      },
      (error) => {
        console.log('Category Deletion failed', error);
      }
    );
  }

}
