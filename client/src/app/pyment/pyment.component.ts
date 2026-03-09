import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cart, CartService } from '../cart.service';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-pyment',
  templateUrl: './pyment.component.html',
  styleUrls: ['./pyment.component.css'],
})
export class PymentComponent implements OnInit {
  nameOfCategory: string = 'Personal';
  cart: Cart[] = [];
  user = new User('', '', '', 0, '', '', 0, '', 0, 0, 0, 0);
  constructor(
    private CartService: CartService,
    private UserServic: UserService
  ) {}
  obj = new Object();
  ngOnInit(): void {
    this.getUser();
  }
  nextStep(name: string) {
    this.nameOfCategory = name;
    if (name == 'Finish') this.checkout();
  }

  checkout() {
    this.CartService.checkOut().subscribe({
      next: (v) => {
        let len = 0;
        localStorage.setItem('quantity', JSON.stringify(len));
      },
      error: (e) => {},
    });
  }
  onSubmit(checkout: NgForm) {
    console.log(checkout.value);

    if (this.user.password != checkout.value.password) {
      alert('password not correct please try again');
    } else {
      this.nameOfCategory = 'Payment';
    }
  }
  getUser() {
    this.UserServic.userInfo().subscribe({
      next: (v) => {
        this.user = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
