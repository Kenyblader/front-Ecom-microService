import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { forkJoin, Observable } from 'rxjs';import { ProductService } from '../../services/product.service';
;

@Component({
  selector: 'app-commandes',
  imports:  [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './commandes.component.html',
  styleUrl: './commandes.component.scss'
})
export class CommandesComponent {
  displayedColumns: string[] = ['id', 'products', 'total', 'status', 'createdAt', 'actions'];
  orders = new MatTableDataSource<Order>();
  productsCache: Map<number, Product> = new Map(); // Cache pour les détails des produits

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.adminService.getOrders().subscribe({
      next: (orders) => {
        this.orders.data = orders;
        // Charger les détails des produits pour chaque commande
        this.loadProductDetails(orders);
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement des commandes.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', error);
      }
    });
  }

  loadProductDetails(orders: Order[]) {
    const productIds = new Set<number>();
    orders.forEach(order => {
      order.products.forEach(p => productIds.add(p.productId));
    });

    const requests: Observable<Product>[] = Array.from(productIds).map(id =>
      this.productService.getProductById(id)
    );

    forkJoin(requests).subscribe({
      next: (products) => {
        products.forEach(product => {
          if (product.id) {
            this.productsCache.set(product.id, product);
          }
        });
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement des détails des produits.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', error);
      }
    });
  }

  formatProducts(orderProducts: { productId: number; quantity: number }[]): string {
    return orderProducts
      .map(p => {
        const product = this.productsCache.get(p.productId);
        return product ? `${product.name} (Qté: ${p.quantity})` : `ID: ${p.productId} (Qté: ${p.quantity})`;
      })
      .join('; ');
  }

  canCancel(order: Order): boolean {
    return order.status !== 'DELIVERED' && order.status !== 'CANCELLED';
  }

  getStatusClass(status: Order['status']): string {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'SHIPPED': return 'status-shipped';
      case 'DELIVERED': return 'status-delivered';
      case 'CANCELLED': return 'status-cancelled';
      default: return '';
    }
  }

  cancelOrder(order: Order) {
    if (order.id) {
      this.adminService.deleteOrder(order.id).subscribe({
        next: () => {
          this.snackBar.open('Commande annulée avec succès !', 'Fermer', { duration: 3000 });
          this.loadOrders(); // Recharger les commandes
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de l\'annulation de la commande.', 'Fermer', { duration: 5000 });
          console.error('Erreur :', error);
        }
      });
    }
  }

}



