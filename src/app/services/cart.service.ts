import { Injectable } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly storageKey = 'cartItems';

  // Ajoute un CartItem au localStorage
  addToLocalStorage(item: CartItem,userId:number): void {
    console.log("product-toCart",item)
    try {
      // Récupérer les éléments existants
      let items: CartItem[] = this.getFromLocalStorage(userId);
      console.log('actual-cart',items)
      // Vérifier si le produit existe déjà (basé sur l'ID)
      const existingItemIndex = items.findIndex(
        i => i.product.id === item.product.id
      );

      if (existingItemIndex !== -1) {
        // Mettre à jour la quantité si le produit existe
        items[existingItemIndex].quantity += item.quantity;
      } else {
        // Ajouter le nouvel élément
        items.push(item);
      }

      // Stocker la liste mise à jour dans localStorage
      localStorage.setItem(`${this.storageKey}-${userId}`, JSON.stringify(items));
    } catch (error) {
      console.error('Erreur lors de l\'ajout au localStorage :', error);
    }
  }

  // Récupère la liste des CartItem depuis le localStorage
  getFromLocalStorage(id:number): CartItem[] {
    try {
      const data = localStorage.getItem(`${this.storageKey}-${id}`);
      if (data) {
        const parsedData = JSON.parse(data);
        // Convertir les objets Product en instances de la classe Product
        console.warn("json-cart",parsedData)
        return parsedData.map((item: any) => ({
          product: new Product({
            id: item.product._id,
            name: item.product._name,
            description: item.product._description,
            price: item.product._price,
            stock: item.product._stock
          }),
          quantity: item.quantity
        }));
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération depuis le localStorage :', error);
      return [];
    } 
  }

  removeCart(id:number){
    localStorage.removeItem(`${this.storageKey}-${id}`)
  }
}