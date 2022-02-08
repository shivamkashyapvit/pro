import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CART } from 'src/app/interface/cart';
import { Product } from 'src/app/interface/Product';
import { AddCartService } from 'src/app/services/add-cart.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css'],
})
export class AdminManageComponent implements OnInit {
  getproducts: any;
  cart_data: CART = new CART();
  quantity: number = 1;
  options: any;
  selectedOption: any;

  constructor(
    private services: AdminService,
    private cartservice: AddCartService,
    private router: Router
  ) {}
  user: any;
  role: any;
  cart: CART[] = new Array<CART>();

  ngOnInit(): void {
    if (localStorage['login_status'] != '1') {

      alert('you are not logged in')

      this.router.navigate(['index/logIn'])

    }
    this.user = JSON.parse('' + localStorage.getItem('user_detail'));
    this.role = this.user.role;
    console.log(this.role);
    this.services.getAllProduct().subscribe((products: any) => {
      this.getproducts = products;
    });

    this.options = [] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    this.selectedOption=1
  }

  delete(productId: any) {
    this.services.delete(productId).subscribe((data) => {
      this.services.getAllProduct().subscribe((products: any) => {
        this.getproducts = products;
      });
    });
  }

  addtocart(product: Product) {
    const loggedUserInfo = '' + localStorage.getItem('user_detail');

    const user = JSON.parse(loggedUserInfo);

    const cardModel = new CART();

    cardModel.userId = user._id;
    cardModel.quantity = this.quantity;

    this.cartservice.cart(user._id, product,this.quantity).subscribe({
      next: (data: any) => {
        alert("successfully added to cart")
      },

      error: (error: any) => {
        alert(error);
      },
    });
  }

  getQuantity(e: any, products: any) {
    this.quantity = e.target.value;
    products.totalPrice = this.quantity * products.price;
  }
}
