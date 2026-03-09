import { Component, OnInit } from '@angular/core';
import { MedicneUserService } from '../medicne-user.service';
import { ProductsService } from '../products.service';
import { UserService, AccessUser } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private UserServic: UserService,
    private productService: ProductsService,
    private medService: MedicneUserService
  ) {}

  userConnected: any;
  userId: string = '';
  lenProductSoldOut: number = 0;
  userState: string = '';
  access: number = 0;
  ngOnInit(): void {
    this.getUser();
    this.soldout();
    this.reiminder();
  }
  getUser() {
    this.UserServic.userInfo().subscribe({
      next: (v) => {
        this.userConnected = v.name;
        if (v.access == AccessUser.worker) {
          this.userState = 'Worker';
          this.access = v.access;
        } else {
          this.userState = 'Manager';
          this.access = v.access;
        }

        let userDeatils = {
          userId: v._id,
          access: v.access,
        };
        localStorage.setItem('access', JSON.stringify(userDeatils));
      },
      error: (e) => console.log(e),
    });
  }
  soldout() {
    this.productService.soldOut().subscribe({
      next: (v) => {
        this.lenProductSoldOut = v.length;
      },
      error: (e) => {},
    });
  }
  reiminder() {
    this.medService.sendEmailReminder().subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
