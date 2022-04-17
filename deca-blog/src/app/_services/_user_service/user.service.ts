import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { IRegisterUser } from 'src/app/_models/IRegisterUser';
import { User } from 'src/app/_models/user';
import { AuthService } from '../_auth_service/auth.service';
import { ApiResponse } from 'src/app/_models/apiResponseModels/apiResponse';
import { UserModel } from 'src/app/_models/userModel';
import { Observable, Subject } from 'rxjs';
import { PaginationData } from 'src/app/_models/pagination-data';
import { RequestParams } from 'src/app/_models/requestParams';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.apiUrl;
  pageParameters: Subject<PaginationData>;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.pageParameters = new Subject<PaginationData>();
   }

   upload(userId: string, file: File): Observable<any>{
    const formData = new FormData();
    formData.append("Photo", file, file.name);
    return this.http.post(this.baseUrl+'user/change-photo/'+userId, formData);
  }

  removePhoto(userId: string): Observable<any>{
    return this.http.delete(this.baseUrl+'user/remove-photo/'+userId);
  }

  signup(model: FormGroup){
    let user: IRegisterUser;
    user = model.value;
    return this.http.post<ApiResponse<string>>(this.baseUrl + 'user/add-decadev', user);
  }

  get User(): User{
    return this.authService.GetUserInfo();
  }

  addInvitee(model: FormGroup, inviteToken: string): Observable<ApiResponse<string>>{
    let user: IRegisterUser = model.getRawValue();
    let headers = new HttpHeaders().set('inviteToken', inviteToken);
    return this.http.put<ApiResponse<string>>(this.baseUrl + 'user/add-invitee', user, {headers});
  }
  
  confirmEmail(model: any){
    return this.http.patch(this.baseUrl+'user/confirm-email', model);
  }

  inviteUser(email: string){
    return this.http.post(this.baseUrl+"user/invite-user?email="+email, {});
  }
  
  getUser(id: string): Observable<ApiResponse<UserModel>>{
    return this.http.get<ApiResponse<UserModel>>(this.baseUrl+"User/get-user/"+id);
  }

  updateUser(userInfo: any, userId: string){
      return this.http.put(this.baseUrl+"User/update-user/"+userId, userInfo);
  }

  updateUserAddress(userInfo: any, userId: string){
      return this.http.put(this.baseUrl+"User/update-address/"+userId, userInfo);
  }

  searchUsers(name: string = "", pageNumber: number = 1, perPage: number = 10) {
    let queryString = "";
    queryString = name.length > 0 ? 
    queryString+=`name=${name}&pageNumber=${pageNumber}&perPage=${perPage}` : 
    queryString+=`pageNumber=${pageNumber}&perPage=${perPage}`;
    return this.http.get(this.baseUrl + 'User/search?'+queryString);
  }

  searchInvitees(name: string = "", pageNumber: number = 1, perPage: number = 10) {
    let queryString = "";
    queryString = name.length > 0 ?
      queryString += `name=${name}&pageNumber=${pageNumber}&perPage=${perPage}` :
      queryString += `pageNumber=${pageNumber}&perPage=${perPage}`;
    return this.http.get(this.baseUrl + 'User/search-invitees/?' + queryString);
  }

  activateUser(userId: string){
    return this.http.patch(this.baseUrl+"User/activate-user/"+userId, {});
  }

  deactivateUser(userId: string){
    return this.http.patch(this.baseUrl+"User/deactivate/"+userId, {});
  }
  
  approveInvitee(id: string): any {
    return this.http.patch(this.baseUrl + "User/approve-invitee/"+id, {});
  }

  getInviteeById(id: string): any{
    return this.http.get(this.baseUrl+"User/get-invitee/"+id);
  }

  getUsers(requestParams:RequestParams){
    let params = new HttpParams()
                    .append("pageNumber", requestParams.PageNumber)
                    .append("perPage", requestParams.PerPage)
    return this.http.get(this.baseUrl+"User/get-users", {params})
  }
}
