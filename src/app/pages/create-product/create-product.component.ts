import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Root, Root2 } from '../../models/product';
import { ProductModel } from '../../models/CreateProduct';
import { MasterServiceService } from '../../services/master-service.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { count } from 'rxjs';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterOutlet],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  productForm: FormGroup = new FormGroup({});
  employeeObj: ProductModel = new ProductModel();
  masterService = inject(MasterServiceService);
  router = inject(Router);
  constructor(){
this.createForm();
  }
  createForm(){
    this.productForm = new FormGroup({
      title: new FormControl(this.employeeObj.title,[Validators.required]),
      price: new FormControl(this.employeeObj.price),
      description: new FormControl(this.employeeObj.description),
      category: new FormControl(this.employeeObj.category),
      image: new FormControl(this.employeeObj.image),
      rate: new FormControl(this.employeeObj.rating.rate),
      count: new FormControl(this.employeeObj.rating.count)
    })
  }
  onSave(){
    var priceValue = this.productForm.controls['price'].value;
    this.productForm.controls['price'].setValue(Number(priceValue)+5);
    this.employeeObj = { ...this.productForm.value, rating: { rate: this.productForm.value.rate, count: this.productForm.value.count } };
    
    try {
      
      // Make the API call and handle success and error scenarios
      this.masterService.createProduct(this.employeeObj).subscribe({
        next: (res: Root2) => {
          console.log('product creation successful:', res);
          this.router.navigate(['/home'],{ queryParams: { productId: res.id, title: res.title } }); 
        },
        error: (err) => {
          console.error('Error creating product:', err);
          // You can show an error message to the user here
        }
      });
    } catch (error) {
      console.error('Caught error:', error);
      // Additional error handling for any synchronous issues
    }
  }
}
