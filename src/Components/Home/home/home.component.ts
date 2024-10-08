import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductdataService } from '../../../DataServices/ProductDataService/product-data.service';
import { ProductComponent } from '../../Product/product/product.component';
import { ActivatedRoute } from '@angular/router';
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

  categoryName: string = "";
  constructor(private productService: ProductdataService, private route: ActivatedRoute){
    //this.categoryName = this.route.snapshot.paramMap.get('categoryname') || "Not Found";
   
  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryname') || '';
    });
   
    console.log(this.categoryName);
   
   
    this.productService.getAllProducts().subscribe(
      (response)=> {
        console.log(response);
        this.products = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  onSortTypeChange(event: Event){
    const sortType = (event.target as HTMLSelectElement).value;

    if(sortType === "priceasc"){
       this.products = this.products.sort((a,b) => a.price - b.price);
    }else if(sortType === "pricedesc"){
      this.products = this.products.sort((a,b) => b.price - a.price);
    }
  }
}
