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

  FilterOrderData: any[] = [];

  totalSales: number = 0;

  totalItemsSold: number = 0;

  constructor(private orderService: OrderDataService){

  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        console.log("Order data", response);
        this.OrderData = response;
        const currentDate = new Date();
     
        this.FilterOrderData = this.OrderData;

        this.FilterOrderData.forEach(order => {
          this.totalSales = Number((this.totalSales + Number(order.totalPrice)).toFixed(2));
          order.orderItems.forEach((orderItem: any) => {
            this.totalItemsSold = this.totalItemsSold + Number(orderItem.quantity);
          }); 
        })
      },
      (error) => {
        console.log("Error fetching all orders", error);
      }
    )


  }


  onReportTypeChange(event: Event){
    const reportType = (event.target as HTMLSelectElement).value;
    console.log(reportType);


    const date = new Date();


    
    if(reportType === "today"){
      const currentDate = new Date();
     
     

      this.FilterOrderData = this.OrderData.filter(data => {
      const orderDate = new Date(data.orderDate);
      return orderDate.getDate()+1 == currentDate.getDate();
      });
      

      this.totalSales = 0;
      this.totalItemsSold = 0;
      this.FilterOrderData.forEach(order => {
        this.totalSales = Number((this.totalSales + Number(order.totalPrice)).toFixed(2));
        order.orderItems.forEach((orderItem: any) => {
          this.totalItemsSold = this.totalItemsSold + Number(orderItem.quantity);
        }); 
      })
    }else if(reportType === "last7days"){
      
      const currentDate = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);

      this.FilterOrderData = this.OrderData.filter(data => {
      const orderDate = new Date(data.orderDate);
      return orderDate >= sevenDaysAgo && orderDate <= currentDate;
      });
      

      console.log("Order Data", this.OrderData);

      this.totalSales = 0;
      this.totalItemsSold = 0;
      this.FilterOrderData.forEach(order => {
        this.totalSales = Number((this.totalSales + Number(order.totalPrice)).toFixed(2));
        order.orderItems.forEach((orderItem: any) => {
          this.totalItemsSold = this.totalItemsSold + Number(orderItem.quantity);
        });

      });
    }else if(reportType === "thisMonth"){
             
      const currentDate = new Date();
      const thisMonth = new Date();
      
      thisMonth.setDate(currentDate.getDay() - currentDate.getDay()+1);

      this.FilterOrderData = this.OrderData.filter(data => {
      const orderDate = new Date(data.orderDate);
      return orderDate >= thisMonth && orderDate <= currentDate;
      });
      

      console.log("Order Data", this.OrderData);

      this.totalSales = 0;
      this.totalItemsSold = 0;
      this.FilterOrderData.forEach(order => {
        this.totalSales = Number((this.totalSales + Number(order.totalPrice)).toFixed(2));
        order.orderItems.forEach((orderItem: any) => {
          this.totalItemsSold = this.totalItemsSold + Number(orderItem.quantity);
        });

      });
    }
  }


}
