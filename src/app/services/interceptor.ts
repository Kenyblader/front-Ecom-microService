// auth.interceptor.ts
import { inject } from '@angular/core';
import {  HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


export const AuthInterceptor =(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>=> {
  
  const authService=inject(AuthService);
  
  
    // Récupérer le token
    const token = authService.getToken();
   
    // Si le token existe, l'ajouter aux headers
    if (token) {
        console.log("active interceptor token:"+token)
      // Cloner la requête pour ajouter l'en-tête d'autorisation
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      console.log(authReq.body)
      return next(authReq);
    }
    
    // Sinon, passer la requête sans modification
    return next(request);
  
}