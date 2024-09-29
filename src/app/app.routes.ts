import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { UserComponent } from './pages/user/user.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { GenerateTokenComponent } from './pages/generate-token/generate-token.component';
import { authGuard } from './auth.guard';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { DummyProductComponent } from './pages/dummy-product/dummy-product.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:ProductsComponent
    },
    {
        path:'create-order',
        component:CreateOrderComponent
    },
    {
        path:'my-order',
        component:MyOrdersComponent
    },
    {
        path:'create-product',
        component:CreateProductComponent
    },
    {
        path:'edit-product',
        component:EditProductComponent
    },
    {
        path:'users',
        component:UserComponent,
        canActivate: [authGuard]
    },
    {
        path:'user-info',
        component:UserInfoComponent
    },
    {
        path:'generate-token',
        component:GenerateTokenComponent
    },
    {
        path:'create-user',
        component:CreateUserComponent
    },
    {
        path:'dummy-product',
        component:DummyProductComponent
    }
    
];
