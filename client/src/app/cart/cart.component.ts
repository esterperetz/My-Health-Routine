import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cart, CartService } from '../cart.service';
import { Product, ProductsService } from '../products.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private CartService: CartService,
    private productService: ProductsService
  ) {}
  @ViewChild('content', { static: false }) el?: ElementRef;
  public static lenCart: number = 0;
  nameOfCategory: string = 'Cart Shop';
  quantity: number = 1;
  totalSum: number = 0;
  cart: Product[] = [];
  quantityFromCart: number;
  ngOnInit(): void {
    this.getCarts();
  }

  nextStep(name: string) {
    this.nameOfCategory = name;
  }
  raise(product: Product) {
    for (let index of this.cart) {
      if (index.SerialNumber == product.SerialNumber)
        if (index.Quantity < 5) {
          // this.quantity++;
          index.Quantity++; // = this.quantity;
          product.Quantity = index.Quantity;
        }
    }
    this.updateQuantity(product);
  }
  down(product: Product) {
    for (let index of this.cart) {
      if (index.SerialNumber == product.SerialNumber)
        if (index.Quantity > 1) {
          this.quantity--;
          index.Quantity--; // = this.quantity;
          product.Quantity = index.Quantity;
        }
    }
    this.updateQuantity(product);
  }
  updateQuantity(product: Product) {
    var cart = {
      productId: product.SerialNumber,
      quantity: product.Quantity,
    };
    this.CartService.updateQuantity(cart).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
        this.down(product);
        alert("can not added to cart because there's not enough quantity");
      },
    });
  }
  getCarts() {
    this.CartService.getCart().subscribe({
      next: (v) => {
        for (let i = 0; i < v[0].Cart.length; i++) {
          this.quantityFromCart = v[0].Cart[i].quantity;
          this.getProduct(v[0].Cart[i].productId, v[0].Cart[i].quantity);
        }
        localStorage.setItem('quantity', JSON.stringify(v[0].Cart.length));
        // window.location.reload();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  getProduct(productId: number, quantity: number) {
    this.productService.getProduct(productId).subscribe({
      next: (v) => {
        v.Quantity = quantity;
        this.totalSum += v.price * v.Quantity;
        this.cart.push(v);
      },

      error: (e) => {},
    });
  }
  getPrice(ele: any) {
    if (ele.target.value == 'price (Low to high)') this.sortByPriceLowToHigh();
    else this.sortByPriceHighToLow();
  }
  sortByPriceLowToHigh() {
    this.cart.sort((a, b) => a.price - b.price);
  }
  sortByPriceHighToLow() {
    this.cart.sort((b, a) => a.price - b.price);
  }
  delete(cart: Product) {
    let carts = {
      productId: cart.SerialNumber,
    };
    this.CartService.deleteCart(carts).subscribe({
      next: (v) => {
        alert('cart deleted');
        window.location.reload();
        let len = JSON.parse(localStorage.getItem('quantity') || ' ');
        len--;
        if (len >= 0) localStorage.setItem('quantity', len);
      },
      error: (e) => console.log(e),
    });
  }
}
