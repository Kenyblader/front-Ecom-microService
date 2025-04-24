
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Order } from '../models/order';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 
  
  private apiUrl = 'http://localhost:8082/orders';

  constructor(private http: HttpClient) {}

 
  // Gestion des commandes
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }

  getOrdersByUserId(id:number){
    return this.http.get<Order[]>(`${this.apiUrl}/user/${id}`)
  }

  createOrder(order: Order) {
    return this.http.post<Order>(`${this.apiUrl}`,order);
  }

  updateOrder(id: number,order:Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



  // Gestion des utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}