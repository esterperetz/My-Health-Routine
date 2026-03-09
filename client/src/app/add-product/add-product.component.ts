import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(private productServer: ProductsService) {}

  value: string = '';
  numberPattern = /\d+/g;
  managerAccess: number;
  ngOnInit(): void {
    this.managerAccess = JSON.parse(
      localStorage.getItem('access') || null || ' '
    ).access;
  }
  valdtion(product: NgForm) {
    //image testing
    if (!product.value.image.match(/((http|https):)/)) {
      alert('image pattern incorrect');
      return false;
    }
    //name testing
    if (product.value.name.length < 2) {
      alert('name to short');
      return false;
    }
    if (
      product.value.name.length <= 0 &&
      product.value.name.match(this.numberPattern) != null
    )
      return false;
    return true;
  }
  getCategory(e: any) {
    this.value = e.target.value;
  }
  onSubmit(product: NgForm) {
    if (this.valdtion(product)) {
      product.value.Quantity_Of_Purchases = 0;
      product.value.category = this.value;
      this.productServer.addProduct(product.value).subscribe({
        next: (v) => {
          alert('product Add successfully');
          window.location.reload();
        },
        error: (e) => alert('product alredy added'),
      });
    }
  }
}
