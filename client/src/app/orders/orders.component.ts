import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { json } from 'express';
import { ProductsService, Product } from '../products.service';
import { jsPDF } from 'jspdf';
import { OrderService } from '../order.service';
import { format } from 'ts-date';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) {}
  @ViewChild('content', { static: false }) el?: ElementRef;
  access: number;
  date: any;
  ngOnInit(): void {
    this.getOrderUser(new Date());
    this.getAllOrders(new Date());
    this.access = JSON.parse(
      localStorage.getItem('access') || null || ' '
    ).access;
  }

  ordersUser: Product[] = [];
  Allorders: Product[] = [];
  totalSum: number = 0;

  getOrderUser(MonthYear: any) {
    let orders: Product[] = [];
    if (MonthYear.value != undefined) this.date = MonthYear.value.monthYear;
    else this.date = new Date();
    this.orderService.userProductThatUserBuy().subscribe({
      next: (v) => {
        console.log(v);
        let index = 0;
        for (let i = 0; i < v.length; i++) {
          if (
            format(new Date(this.date), 'YYYY-MM') ==
            format(new Date(v[i].date), 'YYYY-MM')
          ) {
            this.totalSum += v[i].product.price;
            v[i].date = format(new Date(v[i].date), 'YYYY-MM-DD');
            orders[index] = v[i].product;
            orders[index++].date = v[i].date;
          }
        }
        this.ordersUser = orders;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  getAllOrders(MonthYear: any) {
    let allOrders: Product[] = [];
    if (MonthYear.value != undefined) this.date = MonthYear.value.monthYear;
    else this.date = new Date();
    this.orderService.getAllOrder().subscribe({
      next: (v) => {
        console.log(v);
        let index = 0;
        for (let i = 0; i < v.length; i++) {
          if (
            format(new Date(this.date), 'YYYY-MM') ==
            format(new Date(v[i].date), 'YYYY-MM')
          ) {
            this.totalSum += v[i].product.price;
            v[i].date = format(new Date(v[i].date), 'YYYY-MM-DD');
            allOrders[index] = v[i].product;
            allOrders[index++].date = v[i].date;
          } else {
            console.log(this.totalSum);
            this.totalSum = 0;
            console.log(this.totalSum);
          }
        }
        index = 0;
        console.log(index);
        this.Allorders = allOrders;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
