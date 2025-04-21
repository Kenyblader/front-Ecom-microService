import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './order-managment.component.html',
  styleUrls: ['./order-managment.component.scss']
})
export class OrderManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'userId', 'products', 'total', 'status', 'createdAt'];
  orders = new MatTableDataSource<Order>();

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.adminService.getOrders().subscribe({
      next: (orders) => {
        console.log(orders)
        this.orders.data = orders;
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement des commandes.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', error);
      }
    });
  }

  updateOrderStatus(orderId: number, status: Order['status']) {
    let updatedOrder =this.orders.data.find(o=>o.id===orderId);
    if(!updatedOrder)
    {
      this.snackBar.open('Erreur lors de la mise à jour du statut.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', "order not found");
        return;
    }
    this.adminService.updateOrderStatus(orderId, updatedOrder).subscribe({
      next: () => {
        this.snackBar.open('Statut de la commande mis à jour !', 'Fermer', { duration: 3000 });
        this.loadOrders();
      },
      error: (error) => {
        this.snackBar.open('Erreur lors de la mise à jour du statut.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', error);
      }
    });
  }

  formatProducts(products: { productId: number; quantity: number }[]): string {
    return products.map(p => `ID: ${p.productId}, Qté: ${p.quantity}`).join('; ');
  }
}