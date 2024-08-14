import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductdataService } from '../../../DataServices/ProductDataService/product-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-display-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './display-products.component.html',
  styleUrl: './display-products.component.css'
})
export class DisplayProductsComponent implements OnInit {
   
   
   products: any[] = [];

   constructor(private productService: ProductdataService, private router: Router){

   }

   ngOnInit(): void {
      this.productService.getAllProducts().subscribe(
        (response) => {
          this.products = response;
          console.log(this.products); 
        },
        error => {
         console.log("Error fetching products", error);
        }
      )
  }

  editProduct(id: string){
   console.log(id);
   this.router.navigate([`/editproduct/${id}`]);
  }

  deleteProduct(id: string){
    console.log(id);
    this.productService.deleteProduct(id).subscribe(
      (response) => {
       console.log("Product Deleted!", response);
       this.products = this.products.filter(product => product.productId !== id);
      },
      (error) => {
        console.log("Error deleting Product", error);
      }
    )
  }
}
