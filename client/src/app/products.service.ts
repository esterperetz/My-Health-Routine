import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseURL: string = 'http://localhost:8000/api/product/';
  headers = { 'content-type': 'application/json' };

  constructor(private http: HttpClient) {}
  arrImage: string[] = [
    'https://www.jetsetter.com//uploads/sites/7/2018/04/15AF_lmk-1380x690.jpeg',
    'https://www.calyxta.com/wp-content/uploads/2017/03/Top-10-Wellness-1280.jpg',
  ];
  obs: any;
  count: any = 0;
  getImage() {
    this.obs = new Observable((nextObs) => {
      //פונקציית חץ

      for (let nextProduct of this.arrImage) {
        setTimeout(() => {
          nextObs.next(nextProduct);
        }, 3000 * this.count++);
      }
    });

    return this.obs;
  }
  getProducts(): Observable<any> {
    return this.http.get(this.baseURL + 'products');
  }
  getProduct(SerialNumber: number): Observable<any> {
    return this.http.get(this.baseURL + 'product/' + SerialNumber);
  }
  addProduct(product: Product): Observable<any> {
    let body = JSON.stringify(product);
    console.log(product);
    return this.http.post(this.baseURL + 'addProduct', body, {
      headers: this.headers,
    });
  }
  updateProduct(product: Product): Observable<any> {
    let body = JSON.stringify(product);
    return this.http.post(
      this.baseURL + 'updateProduct/' + product.SerialNumber,
      body,
      {
        headers: this.headers,
      }
    );
  }
  deleteProduct(product: Product): Observable<any> {
    console.log(product.SerialNumber);
    return this.http.delete(
      this.baseURL + 'deleteProduct/' + product.SerialNumber
    );
  }

  soldOut(): Observable<any> {
    return this.http.get(this.baseURL + 'soldOut');
  }
  maxSales(): Observable<any> {
    return this.http.get(this.baseURL + 'maxSales');
  }
  addCommand(commandUser: any): Observable<any> {
    let body = JSON.stringify(commandUser);
    return this.http.post(
      this.baseURL + 'command/' + commandUser.SerialNumber,
      body,
      {
        headers: this.headers,
      }
    );
  }

  getAllCommand(SerialNumber: number): Observable<any> {
    return this.http.get(this.baseURL + 'getAllCommands/' + SerialNumber);
  }

  getStatistics(): Observable<any> {
    return this.http.get('http://localhost:8000/api/Statistics/getStatistics');
  }
}
export class Product {
  _id: string;
  SerialNumber: number;
  name: string;
  Quantity: number;
  Quantity_Of_Purchases: number;
  price: number;
  image: string;
  category: string;
  description: string;
  date: string;

  constructor(
    _id: string,
    SerialNumber: number,
    name: string,
    Quantity: number,
    Quantity_Of_Purchases: number,
    price: number,
    image: string,
    category: string,
    description: string,
    date: string
  ) {
    this._id = _id;
    this.SerialNumber = SerialNumber;
    this.name = name;
    this.Quantity = Quantity;
    this.Quantity_Of_Purchases = Quantity_Of_Purchases;
    this.price = price;
    this.image = image;
    this.category = category;
    this.description = description;
    this.date = date;
  }
}
