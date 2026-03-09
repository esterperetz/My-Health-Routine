import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { threadId } from 'worker_threads';
import { CartService } from '../cart.service';
import { ProductsService, Product } from '../products.service';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private acRout: ActivatedRoute,
    private productServer: ProductsService,
    private UserServic: UserService,
    private CartService: CartService
  ) {}
  @Input() categoryName: any = '';

  product = new Product('', 0, '', 0, 0, 0, ' ', '', '', '');
  productArr: Product[] = [];
  img: string = '';
  edit: boolean = false;
  access: number;
  cartProUser: {
    productId: number;
    quantity: number;
  };
  productId: any;
  sales: number[] = [];
  clickOnEdit() {
    this.edit = true;
  }
  cancel() {
    this.edit = false;
  }
  ngOnInit(): void {
    this.productServer.getImage().subscribe((getNewProduct: any) => {
      this.img = getNewProduct;
    });
    this.getProduct();
    this.access = JSON.parse(
      localStorage.getItem('access') || null || ' '
    ).access;
    this.maxSales();
    // this.getCategory('Vitamins');
  }
  getProduct() {
    this.productServer.getProducts().subscribe({
      next: (v) => {
        this.productArr = v;
      },
      error: (e) => console.log(e),
    });
  }

  delete(product: Product) {
    this.productServer.deleteProduct(product).subscribe({
      next: (v) => {
        alert('product deleted');
        window.location.reload();
      },
      error: (e) => console.log(e),
    });
  }
  addToCart(productIndex: Product) {
    console.log(productIndex.Quantity);
    if (productIndex.Quantity >= 0) {
      //לשנות לגדול
      this.cartProUser = {
        productId: productIndex.SerialNumber,
        quantity: 1,
      };
      this.CartService.addToCart(this.cartProUser).subscribe({
        next: (v) => {
          console.log(v);
          this.getCarts();
          alert('product added to cart');
          window.location.reload();
        },
        error: (e) => {
          alert("can not added to cart because it's about to sold out");
        },
      });
    } else alert('product sold out can not add to cart');
  }
  //add
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
  //add
  maxSales() {
    this.productServer.maxSales().subscribe({
      next: (v) => {
        for (let value of v) {
          this.sales.push(value.SerialNumber);
        }
        console.log(this.sales);
      },
      error: (e) => {},
    });
  }
}
