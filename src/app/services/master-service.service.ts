import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Categories, Root, Root2 } from '../models/product';
import { ProductModel } from '../models/CreateProduct';
import { UserGetResponseModel } from '../models/user';
import { SingleUser } from '../models/singleUser';
import { CreateUserModel } from '../models/createUser';
import { CreatedUserSuccessResponseModel } from '../models/createdUserSuccessResponse';
import { productInfoObjectModel } from '../models/dummyProduct';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {
  sharedData = signal<any>(null);
  buttonClicked$ = new Subject<void>();
  isLoading = signal(false);
  item = signal('');
  dummyProductData = signal<productInfoObjectModel>([]);
  constructor(private http:HttpClient) { }
  apiUrl: string = "https://fakestoreapi.com/";
  userUrl: string = "https://reqres.in/api/users?";
  singleUserUrl: string = "https://reqres.in/api/users/";
  userRegisterUrl: string = "https://reqres.in/api/register";
  loadProducts():Observable<Root>{
    return this.http.get<Root>(this.apiUrl+"products");

  }
  loadCategories():Observable<Categories>{
    return this.http.get<Categories>(this.apiUrl+"products/categories");

  }
  loadUsers():Observable<UserGetResponseModel>{
    return this.http.get<UserGetResponseModel>(this.userUrl+"page=2");

  }
  loadUserById(item:number):Observable<SingleUser>{
    return this.http.get<SingleUser>(this.singleUserUrl+item);

  }
  checkForToken(){
    var token = localStorage.getItem('token');
    return token;
  }
  loadDummyJSONProductData(){
    var jsonObject = [
      {
        "name": "Smartphone",
        "price": "$499.99",
        "description": "A high-end smartphone with a great camera.",
        "category": "Electronics"
      },
      {
        "name": "Jeans",
        "price": "$59.99",
        "description": "Comfortable denim jeans in multiple sizes.",
        "category": "Clothing"
      },
      {
        "name": "Headphones",
        "price": "$199.99",
        "description": "Noise-cancelling wireless headphones.",
        "category": "Electronics"
      },
      {
        "name": "T-Shirt",
        "price": "$19.99",
        "description": "A casual t-shirt in various colors.",
        "category": "Clothing"
      },
      {
        "name": "Wristwatch",
        "price": "$89.99",
        "description": "Stylish wristwatch with a leather band.",
        "category": "Accessories"
      }
    ];
return jsonObject;
  }
  loadProductByCategory(item:string):Observable<Root>{
    return this.http.get<Root>(this.apiUrl+"products/category/"+item);

  }
  createProduct(data:ProductModel):Observable<Root2>{
    return this.http.post<Root2>(this.apiUrl + "products", data);
  }
  createUser(data:CreateUserModel):Observable<CreatedUserSuccessResponseModel>{
    return this.http.post<CreatedUserSuccessResponseModel>(this.userRegisterUrl, data);
  }
  updateProduct(id:number,data:ProductModel):Observable<Root2>{
    return this.http.put<Root2>(this.apiUrl + "products/" + id, data);
  }
  deleteProduct(id:number):Observable<Root2>{
    return this.http.delete<Root2>(this.apiUrl + "products/" + id);
  }
  loadIndividualProduct(id:number):Observable<Root2>{
    return this.http.get<Root2>(this.apiUrl+"products/"+id);
  }
  updateSharedData(data: any) {
    this.sharedData.set(data);
      // Set new value using signal
    // If you're using BehaviorSubject: this.sharedData.next(data);
  }
  showLoader(item:string) {
    this.isLoading.set(true);
    this.item.set(item);
    this.buttonClicked$.next();  // Turn on the loader
  }

  hideLoader() {
    this.isLoading.set(false);  // Turn off the loader
  }
}
