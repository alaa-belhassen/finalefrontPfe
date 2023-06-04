import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenExistGuard implements CanActivate {
  constructor(private router:Router,private routee:ActivatedRoute){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let Token= localStorage.getItem('Token')
     if ( Token ){ 
     var decodedToken:any = jwt_decode(Token);
     var test=decodedToken.role;
     var isauthorized = test.includes(route.data['role'])
    
     return isauthorized

    }
    else return false
   }
  
}
