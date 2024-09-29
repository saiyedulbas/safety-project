import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterServiceService } from '../../services/master-service.service';
import { Categories, Root, Root2 } from '../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  categoryRetriever:string = '';
  route = inject(ActivatedRoute);
  productId: any;
  productTitle: any;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params['productId'];
      this.productTitle = params['title'];

      console.log('Product ID:', this.productId);
      console.log('Product Title:', this.productTitle);
    });
  
    this.loadAllProducts();
    
    this.masterService.buttonClicked$.subscribe(() => {
      this.isLoaderOn = this.masterService.isLoading();
      this.categoryRetriever = this.masterService.item();
      this.masterService.loadProductByCategory(this.categoryRetriever).subscribe((res:Root)=>{
        
        this.productList.set(res);
        this.isLoaderOn = false;
      })
      
      
      
    });
    
  }
  productList = signal<Root>([]);
 isLoaderOn: boolean = false;
  masterService = inject(MasterServiceService);
  loadAllProducts(){
    this.masterService.loadProducts().subscribe((res:Root)=>{
      
      this.productList.set(res);
      console.log(this.productList());
    })
  }
  
  

}
