import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class AuthService{
    private apiUrl='http://localhost:8083/users';
    constructor(private http: HttpClient){ }

    register(email:string,password:string,name:string){
        return this.http.post(`${this.apiUrl}/register`,{email,password,name})
    }

    login(email:string,password:string):Observable<any>{
        console.log({email,password})
        return this.http.post<any>(`${this.apiUrl}/login`,{email,password}).pipe(
            tap(token => {
              localStorage.setItem('auth_token', token.token);
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