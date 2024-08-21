import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductdataService } from '../../../DataServices/ProductDataService/product-data.service';
import { ProductComponent } from '../../Product/product/product.component';
@Component({
  selector: 'app-wall-decor',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductComponent],
  templateUrl: './wall-decor.component.html',
  styleUrl: './wall-decor.component.css'
})

export class WallDecorComponent {

  products: any[] = [];
  quantity: number = 1;

  categoryName: string = "";
  constructor(private productService: ProductdataService){
    //this.categoryName = this.route.snapshot.paramMap.get('categoryname') || "Not Found";
   
  }


  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(
      (response)=> {
        console.log(response);
        this.products = response;
        this.products = this.products.filter(product => {
         return product.category.categoryName === 'Wall Decor';
        })
        console.log(this.products);
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
