import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductdataService } from '../../../DataServices/ProductDataService/product-data.service';
import { ProductComponent } from '../../Product/product/product.component';

@Component({
  selector: 'app-home-fragnances',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductComponent],
  templateUrl: './home-fragnances.component.html',
  styleUrl: './home-fragnances.component.css'
})
export class HomeFragnancesComponent {

  
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
         return product.category.categoryName === 'Home Fragrances';
        })
        //console.log(this.products);
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
