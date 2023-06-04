import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var Token = localStorage.getItem("Token") ;
    if (!!Token){
        var cloned = req.clone({
            headers : req.headers.set("Authorization","Bearer "+Token)
        });
        return next.handle(cloned)
    }
    else{
        return next.handle(req)
    }

}
}
