import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class AuthService{
    private apiUrl='http://localhost:8083/users';
    constructor(private http: HttpClient){ }

    register(email:string,password:string,name:string){
        return this.http.post(`${this.apiUrl}/register`,{email,password,name})
    }
    
}