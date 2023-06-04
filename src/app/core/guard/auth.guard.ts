import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let Token=localStorage.getItem("Token");
      if (Token){
        var decodedToken:any = jwt_decode(Token);
        var test=decodedToken.role;
        var employer = test.includes("employer")
        var superuser = test.includes("superuser")
        var shopowner = test.includes("shopowner")

        console.log(!state.url.includes("/societe"))
        if (employer && !state.url.includes("/societe")){
          this.router.navigate(['/societe']);
        }else if (superuser && !state.url.includes("/dynoAdmin")){
          this.router.navigate(['/dynoAdmin']);
        }else if (shopowner && !state.url.includes("/commercant")){
          this.router.navigate(['/commercant']);
        }
      }
      else {
        this.router.navigate(['']);
      }
    return true;
  }
  
}
