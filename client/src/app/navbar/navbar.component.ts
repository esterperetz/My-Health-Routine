import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public UserService: UserService) {}
  userImage: string = '';
  len: number = 0;
  access: number;
  ngOnInit(): void {
    this.UserService.userInfo().subscribe({
      next: (v) => {
        this.userImage = v.image;
      },
      error: (e) => {},
    });
    this.access = JSON.parse(
      localStorage.getItem('access') || null || ' '
    ).access;
    console.log(this.access);
    if (localStorage.getItem('quantity'))
      this.len = JSON.parse(localStorage.getItem('quantity') || ' ');
  }
}
