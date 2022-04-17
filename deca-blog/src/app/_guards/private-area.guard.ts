import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../_services/_auth_service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class PrivateAreaGuard implements CanActivate {

  constructor(private authService: AuthService, private router : Router){}

  canActivate(): boolean {

    if(!this.authService.isLoggedIn){
      this.router.navigate(['/home']);
    }
    return true;
  }
}
