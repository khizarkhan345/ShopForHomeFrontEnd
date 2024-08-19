import { Component, OnInit } from '@angular/core';
import { OrderDataService } from '../../../DataServices/OrderDataService/order-data.service';
@Component({
  selector: 'app-display-sales',
  standalone: true,
  imports: [],
  templateUrl: './display-sales.component.html',
  styleUrl: './display-sales.component.css'
})
export class DisplaySalesComponent implements OnInit {

  OrderData: any[] = [];

  constructor(private orderService: OrderDataService){

  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        console.log("Order data", response);
        this.OrderData = response;
      },
      (error) => {
        console.log("Error fetching all orders", error);
      }
    )

  }



}
