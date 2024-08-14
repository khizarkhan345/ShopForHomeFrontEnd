import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductdataService } from '../../../DataServices/ProductDataService/product-data.service';
import { ProductComponent } from '../../Product/product/product.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: any[] = [];
  quantity: number = 1;

  constructor(private productService: ProductdataService){

  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response)=> {
        this.products = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addToCart(product: any){
    console.log(product);
  }
}
