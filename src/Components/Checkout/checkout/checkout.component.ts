import { Component, OnInit } from '@angular/core';
import { CartDataService } from '../../../DataServices/CartDataService/cartdata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { USER_TOKEN } from '../../../DataServices/UserDataService/userdata.service';
import { Address } from '../../../Model/Address';
import { myOrder } from '../../../Types/Order';
import { OrderDataService } from '../../../DataServices/OrderDataService/order-data.service';
import { ProductdataService } from '../../../DataServices/ProductDataService/product-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  model: Address;
  CartData: any[] = [];

  couponInput: string = "";

  couponMessage: string = "";
  errorMessage: string = "";

  token: any = {};

  totalValue: number = 0;
  constructor(private cartService: CartDataService, private orderService: OrderDataService,
     private router:Router, private productService: ProductdataService
  ){
    this.model = new Address("", "", "", 0);
  }

  ngOnInit(): void {
    this.token = localStorage.getItem(USER_TOKEN);
       
        if(this.token){
          console.log(JSON.parse(this.token));
          const cartId = JSON.parse(this.token).cart.cartId;
          
          this.cartService.getAllCartItems(cartId).subscribe(
            (response) => {
              console.log(response);
              this.CartData = response;
              this.CartData.forEach((element: any) => {
                this.totalValue = this.totalValue + Number(element.product.price)*Number(element.quantity);
          
              });
            },
            (error) => {
              console.log(error);
            }
          );
        }

  }

  handleCoupon(){
    console.log("Coupon button is clicked");
    console.log(this.couponInput);
    console.log(this.CartData);
    if(this.couponInput !== ""){
      const coupons = JSON.parse(this.token).coupons;
      console.log(coupons);
      let foundCoupon = coupons.filter((element: any) => {
       return element.couponCode == this.couponInput;
      });

      if(foundCoupon.length > 0){
        this.totalValue = this.totalValue - this.totalValue*Number(foundCoupon[0].couponPercentage);

        this.couponMessage="Coupon Applied";

         setTimeout(() => {
        this.couponMessage = "";
         },2000);

      }else{
         
        this.couponMessage="Invalid Coupon";
         setTimeout(() => {
         this.couponMessage = "";
          },2000);

      } 
      
      this.totalValue = Number(this.totalValue.toFixed(2)),

      console.log("Index", foundCoupon);
    }else{
      this.couponMessage="Coupon Input is empty";
      setTimeout(() => {
        this.couponMessage = "";
      },2000);
    }
  }

  handleOrder(){
    console.log(this.model);

    if(this.model.streetAddress === "" || this.model.city === ""
       || this.model.state === "" || this.model.zipCode === 0){
        
        this.errorMessage = "Address fields must not be null";

        setTimeout(() => {
          this.errorMessage = "";
        }, 2000);
        
    }else{
    let userId = JSON.parse(this.token).userId;

    const date = new Date();

    console.log("Month", date.getMonth());

    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    let year = date.getFullYear().toString();

    month = 0 + month.toString();
    let currentDate = `${year}-${month}-${day}`;

    console.log("current date", currentDate);

    const orderData: myOrder = {
       orderDate: currentDate,
       totalPrice: Number(this.totalValue.toFixed(2)),
       userId: userId,
       orderItemRequest: []
    }
    
    this.CartData.forEach(cartData => {
      console.log(cartData);

      let orderItemData = {
        quantity: cartData.quantity,
        unitPrice: cartData.product.price,
        productId: cartData.product.productId
      };

      orderData.orderItemRequest.push(orderItemData);
    })

    this.orderService.createNewOrder(orderData).subscribe(
      (response) => {
         console.log("Order created", response);


         this.CartData.forEach((cartItem) => {
          const newStock = Number(cartItem.product.stock) - Number(cartItem.quantity);
          const newProduct = cartItem.product;
          newProduct.stock = newStock;

          this.productService.editProduct(newProduct, cartItem.product.productId).subscribe(
            (response) => {
              console.log("Product updated successfully", response);
           
             },
            (error) => {
              console.log("Error updating product", error);
            }
           );
       

          this.cartService.removeItemFromCart(cartItem.cartItemId).subscribe(
            (response) => {
              console.log("Item removed from cart", response);
           
             },
            (error) => {
              console.log("Error removing item from cart", error);
            }
           )
         })
         

         this.router.navigate(["/ordersuccess"]);
      },
      (error) => {
        console.log("Unable to create new Order", error);
      }
    )
    console.log(orderData);

  }

  }
}
