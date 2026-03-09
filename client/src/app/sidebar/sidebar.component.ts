import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private productServer: ProductsService) {}
  img: string = '';
  categoryName: any = 'allCategory';
  ngOnInit(): void {
    // this.productServer.getProducts().subscribe((getNewProduct: any) => {
    //   this.img = getNewProduct;
    // });
  }

  Probiotics() {
    this.categoryName = 'Probiotics';
    console.log('added');
  }
  Food_Additives() {
    this.categoryName = 'Food Additives';
  }
  Vitamins() {
    this.categoryName = 'Vitamins';
  }
  allCategory() {
    this.categoryName = 'allCategory';
  }
}
