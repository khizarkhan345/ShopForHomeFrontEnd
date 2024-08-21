import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Product } from '../../../Model/Product';
import { ProductdataService } from '../../../DataServices/ProductDataService/product-data.service';
import { CategoryDataService } from '../../../DataServices/CategoryDataService/category-data-service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize, Observable } from 'rxjs';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  model: Product;

  Categories: any[] = [];

  errorMessage: string = "";

  productId!: string;
  product: any = {};
  selectedFile: File | null = null;

  uploadProgress!: Observable<number | undefined>;
  downloadURL!: Observable<string | null>;

  constructor(
    private storage: AngularFireStorage,
    private productService: ProductdataService,
    private categoryService: CategoryDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.model = new Product('', '', '', 0, 0, '');
  }

  ngOnInit(): void {
    
    this.productId = this.route.snapshot.paramMap.get('id') || "Not Found";

    console.log("ProductId", this.productId);
    this.categoryService.getAllCategories().subscribe(
      (response) => {
        this.Categories = response;
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.productId !== 'Not Found') {
      console.log("Product Id inside if condition", this.productId);
      this.productService.getASingleProduct(this.productId).subscribe(
        (response) => {
          this.product = response;

          this.model = new Product(
            this.product.title,
            this.product.imageURL,
            this.product.description,
            this.product.price,
            this.product.stock,
            this.product.categoryId
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      //const file = event.target.files[0];
      const filePath = `images/${Date.now()}_${this.selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);

      // Observe percentage changes
      this.uploadProgress = task.percentageChanges();

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe((url) => {
              this.model.imageURL = url;
            });
          })
        )
        .subscribe();
    }
  }

  // // Observe percentage changes
  // this.uploadProgress$ = task.percentageChanges();

  // Get notified when the download URL is available

  onSubmit(productForm: any) {
    console.log(productForm.value);
    console.log(this.model);
    //console.log(this.selectedFile);

    if(productForm.value.title === "" || productForm.value.description === "" || productForm.value.stock === 0 
      || productForm.value.price === "" || productForm.value.categoryId == "" || this.selectedFile === null
    ){
      this.errorMessage="Input field must not be null";
       setTimeout(() => {
          this.errorMessage = "";
       }, 2000);
    }else{

    
    if(this.productId !== 'Not Found'){
      this.productService.editProduct(this.model, this.productId).subscribe(
        (response) => {
          console.log("Product Edited!", response);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log("Error editing product", error);
        }
      )
    }else{
      this.productService.addProduct(this.model).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
    
  }
}
