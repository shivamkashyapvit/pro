import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/interface/Product';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(private services: AdminService, private router: Router) {}

  ngOnInit(): void {}

  submit(value: any) {
    this.services.postproducts(value).subscribe(() => {
      this.router.navigate(['header', 'allProduct']);
    });
  }
}
