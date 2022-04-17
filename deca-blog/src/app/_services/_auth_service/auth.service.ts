import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../_models/apiResponseModels/apiResponse';
import { LoginResponseModel } from '../../_models/loginResponseModel';
import { LoginModel } from '../../_models/loginModel';
import { User } from '../../_models/user';
import { ChangePasswordModel } from 'src/app/_models/changePasswordModel';
import { IResponse } from 'src/app/_models/apiResponseModels/Response';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + 'auth/';
  jwtHelper: JwtHelperService;

  loginResponse: LoginResponseModel;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  login(model: LoginModel): Observable<ApiResponse<LoginResponseModel>> {
    return this.http.post<ApiResponse<LoginResponseModel>>(
      this.baseUrl + 'login',
      model
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user_token');
    if (!token) {
      return false;
    }
    let isExpiredToken = this.jwtHelper.isTokenExpired(token);
    if (isExpiredToken) {
      return false;
    }
    return true;
  }

  getToken(): string {
    return localStorage.getItem('user_token');
  }
  GetRoles(): string {
    return this.jwtHelper.decodeToken(this.getToken()).role;
  }

  GetUserInfo(): User {
    let tokenInfo = this.jwtHelper.decodeToken(this.getToken());
    let user: User = {
      Id: tokenInfo.nameid,
      FullName: tokenInfo.unique_name,
      Email: tokenInfo.email,
      Photo: tokenInfo.photo,
      Roles: tokenInfo.role,
    };
    user.Photo = user.Photo
      ? user.Photo
      : './../../../assets/images/avartar.png';
    return user;
  }
  get isAdmin(): boolean {
    if (!this.GetRoles().includes('Admin')) {
      return false;
    }
    return true;
  }

  get isDecadev(): boolean {
    if (!this.GetRoles().includes('Decadev')) {
      return false;
    }
    return true;
  }

  get isEditor(): boolean {
    if (!this.GetRoles().includes('Editor')) {
      return false;
    }
    return true;
  }

  setToken(token: string): void {
    localStorage.setItem('user_token', token);
  }
  
  changePassword(model: ChangePasswordModel): Observable<IResponse<string>>{
    let id = this.GetUserInfo().Id;
    const params = new HttpParams().set('Id',id)
    return this.http.put<IResponse<string>>(this.baseUrl +"change-password",model, {params});
  }
}
