import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  @Input() product: any;

  quantity: number = 1;

  addToCart(product: any){
   console.log(product);
  }

  addToWishlist(product: any){
    console.log(product);
  }
}
