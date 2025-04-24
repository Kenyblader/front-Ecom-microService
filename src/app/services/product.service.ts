import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Product } from "../models/product";

@Injectable({
    providedIn:'root'
})
export class ProductService{
    private apiUrl=`http://localhost:8081/products`;
    constructor(private http:HttpClient){}

     // Gestion des produits
  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map(data=>data.map(d=>new Product(d)))
    );
  }

  getProductById(id: number): any {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, {
        name:product.name,
        description:product.description,
        price:product.price,
        stock:product.stock
    });
  }

  updateProduct(product: Product): Observable<Product> {
    console.log(product)
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, 
        {
            name:product.name,
            description:product.description,
            price:product.price,
            stock:product.stock
        }
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}