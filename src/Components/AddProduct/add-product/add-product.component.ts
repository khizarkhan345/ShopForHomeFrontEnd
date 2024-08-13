import { Component } from '@angular/core';
import { Product } from '../../../Model/Product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
    model: Product;
    selectedFile: File | null = null;

    onFileSelected(event: Event): void {
      const fileInput = event.target as HTMLInputElement;
      if(fileInput.files && fileInput.files.length > 0){
        this.selectedFile = fileInput.files[0];
      }
    }

    constructor() {
      this.model = new Product("", "", "", 0, 0, "");
    }

    onSubmit(productForm: any){
      console.log(productForm.value);
      console.log(this.selectedFile);
    }
}
