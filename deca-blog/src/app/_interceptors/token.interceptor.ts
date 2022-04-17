import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/_auth_service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req = request;
    if(this.authService.isLoggedIn){
      req = request.clone({setHeaders: {Authorization: "Bearer " +this.authService.getToken()}});
    }
    return next.handle(req);
  }
}
