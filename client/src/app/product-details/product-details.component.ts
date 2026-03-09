import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { Product, ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private acRout: ActivatedRoute,
    private productService: ProductsService,
    private CartService: CartService,
    private orderService: OrderService
  ) {}
  product = new Product('', 0, '', 0, 0, 0, ' ', '', '', '');

  SerialNumber: number;
  access: number;
  cartProUser: {
    productId: number;
    quantity: number;
  };
  commands: any[] = [];
  quantity: number = 1;
  command: string;
  orders: Product[] = [];
  ngOnInit(): void {
    this.SerialNumber = this.acRout.snapshot.params['SerialNumber'];
    this.getProduct();
    this.access = JSON.parse(
      localStorage.getItem('access') || null || ' '
    ).access;
    this.getOrderUser();
  }
  getProduct() {
    this.productService.getProduct(this.SerialNumber).subscribe({
      next: (v) => {
        this.product = v;
        this.getAllCommand();
        console.log(v);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  valdtion() {
    //image testing
    if (!this.product.image.match(/((http|https):)/)) {
      alert('image pattern incorrect');
      return false;
    }
    //name testing
    if (this.product.name.length < 2) {
      alert('name to short');
      return false;
    }
    if (this.product.Quantity > 1000) {
      alert('Quantity not in range 0-500');
      return false;
    }
    if (this.product.price.toString.length > 3) {
      alert('price need to be 3 digit');
      return false;
    }

    return true;
  }
  raise() {
    if (this.quantity < 5) this.quantity++;
  }
  down() {
    if (this.quantity > 1) this.quantity--;
  }
  onSave() {
    if (this.valdtion()) {
      this.productService.updateProduct(this.product).subscribe({
        next: (v) => {
          console.log(v);
          alert('product details upadate successfully');
          // this.router.navigateByUrl('/Natural-products');
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
  addToCart() {
    if (this.product.Quantity >= 0) {
      this.cartProUser = {
        productId: this.product.SerialNumber,
        quantity: this.quantity,
      };
      this.CartService.addToCart(this.cartProUser).subscribe({
        next: (v) => {
          alert('product added to cart');
          this.getCarts();
          window.location.reload();
        },
        error: (e) => {
          if (e.status == 401)
            alert("can not added to cart because there's not enough quantity");
          // else alert('product already in cart');
        },
      });
    } else alert('product sold out can not add to cart');
  }
  getCarts() {
    this.CartService.getCart().subscribe({
      next: (v) => {
        localStorage.setItem('quantity', JSON.stringify(v[0].Cart.length));
        // window.location.reload();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  submitCommand() {
    let commandUser = {
      command: this.command,
      SerialNumber: this.product.SerialNumber,
    };
    this.productService.addCommand(commandUser).subscribe({
      next: (v) => {
        window.location.reload();
      },
      error: (e) => {
        console.log(e);
      },
    });
    // this.commandUser.SerialNumber = this.product.SerialNumber;
  }
  getAllCommand() {
    this.productService.getAllCommand(this.product.SerialNumber).subscribe({
      next: (v) => {
        console.log(v);
        this.commands = v[0].Reviews;
      },
      error: (e) => {},
    });
  }
  getOrderUser() {
    this.orderService.userProductThatUserBuy().subscribe({
      next: (v) => {
        console.log(v);
        for (let i = 0; i < v.length; i++) {
          this.orders.push(v[i].product);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
