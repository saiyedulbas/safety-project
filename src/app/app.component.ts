import { HttpClient } from '@angular/common/http';
import { Component,inject,OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MasterServiceService } from './services/master-service.service';
import { Categories, Root } from './models/product';
import { ProductsComponent } from './pages/products/products.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  currentUrl: string = '';
  constructor(private http:HttpClient, private router:Router){
    
  }
  title:string = "ECom";
  ngOnInit(): void {
    this.loadAllCategories();
    this.loadAllProducts();
    this.detectCurrentUrl();
  }
  categoryList = signal<Categories>([]);
  masterService = inject(MasterServiceService);
  loadAllCategories(){
    this.masterService.loadCategories().subscribe((res:Categories)=>{
      
      this.categoryList.set(res);
      console.log(this.categoryList());
    })
  }
  productList = signal<Root>([]);
 
  
  loadAllProducts(){
    this.masterService.loadProducts().subscribe((res:Root)=>{
      
      this.productList.set(res);
      console.log(this.productList());
    })
  }
  fetchProduct(item:string){
    this.masterService.showLoader(item);
    
  }
  detectCurrentUrl(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url; // Update currentUrl on navigation end
        console.log(this.currentUrl);
      }
    });
  }
  
}
