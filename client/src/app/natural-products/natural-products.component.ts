import { Component, OnInit, ViewChild } from '@angular/core';

import { ProductsService, Product } from '../products.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-natural-products',
  templateUrl: './natural-products.component.html',
  styleUrls: ['./natural-products.component.css'],
})
export class NaturalProductsComponent implements OnInit {
  @ViewChild(SidebarComponent) sidelist: SidebarComponent | null;
  img: String = '';

  constructor(
    private productServer: ProductsService,
    private router: Router,
    private UserServic: UserService
  ) {}
  orders: Product[] = [];
  ngOnInit(): void {
    this.productServer.getImage().subscribe((getNewProduct: any) => {
      this.img = getNewProduct;
    });
  }
}
