import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { User } from "../models/user";

@Injectable({
    providedIn:"root"
})
export class AuthService{
  
    public static  userId:number=0;
    private apiUrl='http://localhost:8083/users';
    constructor(private http: HttpClient){ }

    getProfile(id:number) {
      return this.http.get<User>(`${this.apiUrl}/${id}`)
    }

    updateProfile(user: User) {
      return this.http.put<User>(`${this.apiUrl}/${user.id}`,user)
    }

    register(email:string,password:string,name:string){
        return this.http.post(`${this.apiUrl}/register`,{email,password,name,"role":"USER"})
    }

    login(email:string,password:string):Observable<any>{
        console.log({email,password})
        return this.http.post<any>(`${this.apiUrl}/login`,{email,password}).pipe(
            tap(data => {
              localStorage.setItem('auth_token', data.token);
              AuthService.userId=data.user.id;
            })
          );
    }

    // Récupérer le token stocké
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
  
  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  // Déconnexion
  logout(): void {
    localStorage.removeItem('auth_token');
  }

}