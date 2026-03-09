import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseURL: string = 'http://localhost:8000/api/Order/';
  headers = { 'content-type': 'application/json' };
  constructor(private http: HttpClient) {}

  userProductThatUserBuy(): Observable<any> {
    return this.http.get(this.baseURL + 'getUserOrder');
  }
  getAllOrder(): Observable<any> {
    return this.http.get(this.baseURL + 'getOrders');
  }
}
