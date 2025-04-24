import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem, LocalStorageService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['product', 'price', 'quantity', 'total', 'actions'];
  cart: CartItem[] = []; // À synchroniser avec ProductsComponent
  id!:number;

  constructor(
    private orderService:AdminService,
    private snackBar: MatSnackBar,
    private cartService:  LocalStorageService,
    private activeRoute:ActivatedRoute
  ) {
    
  }
  ngOnInit(): void {
    this.id=AuthService.userId;

    this.cart = this.cartService.getFromLocalStorage(this.id)??[];
    console.log('userId',this.activeRoute.snapshot.paramMap.keys)
  }

  updateQuantity(item: { product: Product; quantity: number }) {
    if (item.quantity < 1) {
      item.quantity = 1;
    } else if (item.quantity > item.product.stock) {
      item.quantity = item.product.stock;
      this.snackBar.open('Quantité maximale atteinte.', 'Fermer', { duration: 3000 });
    }
    
  }

  removeFromCart(item: { product: Product; quantity: number }) {
    this.cart = this.cart.filter(cartItem => cartItem.product.id !== item.product.id);
    this.snackBar.open('Produit retiré du panier.', 'Fermer', { duration: 3000 });
  }

  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  placeOrder() {
    const userId = this.id;
    if (!userId) {
      this.snackBar.open('Veuillez vous connecter pour passer une commande.', 'Fermer', { duration: 5000 });
      return;
    }

    const order: Order = {
      userId,
      products: this.cart.map(item => ({ productId: item.product.id!, quantity: item.quantity })),
      total: this.getCartTotal(),
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.cart = [];
        this.cartService.removeCart(this.id);
        this.snackBar.open('Commande passée avec succès !', 'Fermer', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Erreur lors de la commande.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', error);
      }
    });
  }
}