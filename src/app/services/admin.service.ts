
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
  private apiurlUser= 'http://localhost:8083/users'

  constructor(private http: HttpClient) {}

 
  // Gestion des commandes
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}`);
  }

  updateOrderStatus(id: number,order:Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${id}`, {... order });
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