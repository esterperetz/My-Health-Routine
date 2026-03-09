import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseURL: string = 'http://localhost:8000/api/cart/';

  headers = { 'content-type': 'application/json' };
  constructor(private http: HttpClient) {}

  addToCart(add_to_cart: any): Observable<any> {
    let body = JSON.stringify(add_to_cart);
    return this.http.put(
      this.baseURL + 'addToCart/' + add_to_cart.productId,
      body,
      {
        headers: this.headers,
      }
    );
  }
  getCart(): Observable<any> {
    return this.http.get(this.baseURL + 'userCart');
  }
  deleteCart(cart: any): Observable<any> {
    console.log(cart);
    return this.http.delete(this.baseURL + 'deleteCart/' + cart.productId);
  }
  updateQuantity(cart: any): Observable<any> {
    let body = JSON.stringify(cart);
    return this.http.post(this.baseURL + 'updateQuantity/', body, {
      headers: this.headers,
    });
  }
  checkOut(): Observable<any> {
    return this.http.delete(this.baseURL + 'checkout');
  }
  getcheckOut(): Observable<any> {
    return this.http.get('http://localhost:8000/api/checkout/' + 'checkouts');
  }
}
export class Cart {
  userId: string;
  productId: number;
  paid: boolean;
}
export class Checkout {
  date: Date;
  Cart: Cart[];
}
