import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProductManagementComponent } from './admin/product-managment/product-managment.component';
import { OrderManagementComponent } from './admin/order-managment/order-managment.component';

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
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ];
