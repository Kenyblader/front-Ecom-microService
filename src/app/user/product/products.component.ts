import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem, LocalStorageService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.scomponent.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  sortBy: string = 'name';
  id=AuthService.userId;
  cart: CartItem[] = [];

  constructor(
    private productService:ProductService,
    private activeRoute:ActivatedRoute,
    private adminService: AdminService,
    private cartService: LocalStorageService,
    private snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit() {
    console.log(this.id)
    this.loadProducts();
  }

 

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filterProducts();
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement des produits.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', error);
      }
    });
  }

  filterProducts() {
    let filtered = [...this.products];

    // Filtrer par nom
    if (this.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Trier
    switch (this.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'stock':
        filtered.sort((a, b) => b.stock - a.stock);
        break;
    }

    this.filteredProducts = filtered;
  }

  addToCart(product: Product) {
    const cartItem = this.cart.find(item => item.product.id === product.id);

    if (cartItem) {
      if (cartItem.quantity < product.stock) {
        
        this.snackBar.open('Quantité mise à jour dans le panier.', 'Fermer', { duration: 3000 });
      } else {
        this.snackBar.open('Stock insuffisant.', 'Fermer', { duration: 3000 });
      }
    } else {
      this.cart.push({ product, quantity: 1 });
      console.log("product-cat",product)
      this.cartService.addToLocalStorage({ product, quantity: 1 },this.id);
      this.snackBar.open('Produit ajouté au panier !', 'Fermer', { duration: 3000 });
    }
  }
}