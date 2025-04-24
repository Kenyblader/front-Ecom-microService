import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductManagementComponent } from './admin/product-managment/product-managment.component';
import { OrderManagementComponent } from './admin/order-managment/order-managment.component';
import { ProductsComponent } from './user/product/products.component';
import { ProfileComponent } from './user/profil/profil.component';
import { CartComponent } from './user/cart/cart.component';
import { UserComponent } from './user/user.component';
import { CommandesComponent } from './user/commandes/commandes.component';

export const routes: Routes = [
    {
      path: 'admin',
      component: AdminComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'products', component: ProductManagementComponent },
        { path: 'orders', component: OrderManagementComponent },
        // { path: 'users', component: UserManagementComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
      ]
    },
    {
      path: 'user/:id',
      component: UserComponent,
      children: [
        { path: 'products', component: ProductsComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'cart', component: CartComponent },
        { path: 'orders', component: CommandesComponent},
        { path: '', redirectTo: 'products', pathMatch: 'full' }
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
