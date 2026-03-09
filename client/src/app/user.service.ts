import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements HttpInterceptor {
  baseURL: string = 'http://localhost:8000/api/user/';
  headers = { 'content-type': 'application/json' };

  constructor(private http: HttpClient, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(localStorage.getItem('user data'));
    let token: string = localStorage.getItem('user data') || '';
    let tokenUser = req.clone({
      setHeaders: {
        Token: token,
      },
    });
    return next.handle(tokenUser);
  }
  getUsers(): Observable<any> {
    return this.http.get(this.baseURL + 'users');
  }
  addUser(user: User): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this.baseURL + 'register', body, {
      headers: this.headers,
    });
  }
  loged_In_User(user: object): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this.baseURL + 'login', body, {
      headers: this.headers,
    });
  }
  forget_password(user: object): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this.baseURL + 'forgetPassword', body, {
      headers: this.headers,
    });
  }
  sendNew_password(email: string): Observable<any> {
    return this.http.get(this.baseURL + 'sendNewPass/' + email);
  }
  loggedIn() {
    if (localStorage.getItem('user data')) {
      return true;
    }
    return false;
  }

  loggOut() {
    console.log(localStorage.getItem('user data'));
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }

  //get userInfo for user that alreay connected
  userInfo(): Observable<any> {
    return this.http.get(this.baseURL + 'userInfo');
  }

  userDetails(userId: string): Observable<any> {
    return this.http.get(this.baseURL + 'userInfo/' + userId);
  }

  updateUser(user: User): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this.baseURL + 'updateUserInfo/' + user._id, body, {
      headers: this.headers,
    });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(this.baseURL + 'deleteUser/' + userId);
  }

  HealthStatement(user: Object): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post(this.baseURL + 'Health-Statement', body, {
      headers: this.headers,
    });
  }
}
export enum AccessUser {
  user = 1,
  worker = 2,
  manager = 3,
}

export class User {
  _id: string;
  name: string;
  email: string;
  password: number;
  phone: string;
  image: string;
  access: number;
  token: string;
  loginAttempts: number;
  height: number;
  weight: number;
  age: number;

  constructor(
    id: string,
    name: string,
    email: string,
    password: number,
    phone: string,
    image: string,
    acccess: number,
    token: string,
    logniAttempts: number,
    height: number,
    weight: number,
    age: number
  ) {
    this._id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.image = image;
    this.access = acccess;
    this.token = token;
    this.loginAttempts = logniAttempts;
    this.height = height;
    this.weight = weight;
    this.age = age;
  }
}
