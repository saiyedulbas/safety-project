import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModel } from '../../models/CreateProduct';
import { MasterServiceService } from '../../services/master-service.service';
import { Router } from '@angular/router';
import { Root, Root2 } from '../../models/product';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatIcon],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  productForm: FormGroup = new FormGroup({});
  employeeObj: ProductModel = new ProductModel();
  
  masterService = inject(MasterServiceService);
  router = inject(Router);
  productList = signal<Root>([]);
  constructor(){
this.createForm();
this.loadAllProducts();
  }
  createForm(){
    this.productForm = new FormGroup({
      id: new FormControl(this.employeeObj.id),
      title: new FormControl(this.employeeObj.title,[Validators.required]),
      price: new FormControl(this.employeeObj.price),
      description: new FormControl(this.employeeObj.description),
      category: new FormControl(this.employeeObj.category),
      image: new FormControl(this.employeeObj.image)
    })
  }
  onSave(){
    this.employeeObj = this.productForm.value;
    try {
      console.log(this.productForm.controls['id'].value);
      // Make the API call and handle success and error scenarios
      this.masterService.updateProduct(this.productForm.controls['id'].value,this.employeeObj).subscribe({
        next: (res: Root2) => {
          console.log('product update successful:', res);
          alert(res.id+" updated");
          this.employeeObj = new ProductModel();
          this.createForm();
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
  loadAllProducts(){
    this.masterService.loadProducts().subscribe((res:Root)=>{
      
      this.productList.set(res);
      console.log(this.productList());
    })
  }
  onEdit(id:number){
    this.masterService.loadIndividualProduct(id).subscribe((res:Root2)=>{
      
      this.employeeObj = res;
      this.createForm();
      
    })
  }
  onDelete(id:number){
    
    try {
      
      // Make the API call and handle success and error scenarios
      this.masterService.deleteProduct(id).subscribe({
        next: (res: Root2) => {
          console.log('product deleted successful:', res);
          alert(res.id+" deleted");
          
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          // You can show an error message to the user here
        }
      });
    } catch (error) {
      console.error('Caught error:', error);
      // Additional error handling for any synchronous issues
    }
  }
}
