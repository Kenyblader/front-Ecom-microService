import { Component, OnInit } from '@angular/core';
  import { MatCardModule } from '@angular/material/card';
  import { MatIconModule } from '@angular/material/icon';
  import { AdminService } from '../../services/admin.service';
import { ProductService } from '../../services/product.service';
  
  @Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [MatCardModule, MatIconModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
  })
  export class DashboardComponent implements OnInit {
    stats = { products: 0, orders: 0, users: 0 };
  
    constructor(private adminService: AdminService, private productService:ProductService) {}
  
    ngOnInit() {
      this.productService.getProducts().subscribe(products => {
        this.stats.products = products.length;
      });
      this.adminService.getOrders().subscribe(orders => {
        this.stats.orders = orders.length;
      });
      this.adminService.getUsers().subscribe(users => {
        this.stats.users = users.length;
      });
    }
  }