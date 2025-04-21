import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ajouté pour le pipe number
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../models/product';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule, // Nécessaire pour le pipe number
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './product-managment.component.html', // Nom corrigé
  styleUrls: ['./product-managment.component.scss']
})
export class ProductManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'stock', 'actions'];
  products = new MatTableDataSource<Product>();

  constructor(
    private adminService: ProductService,

    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.adminService.getProducts().subscribe({
      next: (products) => {
        console.log(products)
        this.products.data = products;
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement des produits.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', error);
      }
    });
  }

  openProductDialog(product?: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: product ? { ...product } : new Product()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.adminService.updateProduct(result).subscribe({
            next: () => {
              this.snackBar.open('Produit mis à jour !', 'Fermer', { duration: 3000 });
              this.loadProducts();
            },
            error: (error) => {
              this.snackBar.open('Erreur lors de la mise à jour.', 'Fermer', { duration: 5000 });
              console.error('Erreur :', error);
            }
          });
        } else {
          this.adminService.addProduct(result).subscribe({
            next: () => {
              this.snackBar.open('Produit ajouté !', 'Fermer', { duration: 3000 });
              this.loadProducts();
            },
            error: (error) => {
              this.snackBar.open('Erreur lors de l’ajout.', 'Fermer', { duration: 5000 });
              console.error('Erreur :', error);
            }
          });
        }
      }
    });
  }

  deleteProduct(id: number) {
    this.adminService.deleteProduct(id).subscribe({
      next: () => {
        this.snackBar.open('Produit supprimé !', 'Fermer', { duration: 3000 });
        this.loadProducts();
      },
      error: (error) => {
        this.snackBar.open('Erreur lors de la suppression.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', error);
      }
    });
  }
}
