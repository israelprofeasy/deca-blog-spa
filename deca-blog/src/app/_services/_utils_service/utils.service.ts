import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OverView } from 'src/app/_models/apiResponseModels/overview-data';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../_models/apiResponseModels/apiResponse';
import { IStackAndSquad } from '../../_models/apiResponseModels/StackAndSquad';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private router : Router) { }

  getStacksAndSquads(){
    return this.http.get<ApiResponse<IStackAndSquad>>(this.baseUrl + 'utils/stack-and-squad');
  }
  getOverviewData(){
    return this.http.get<OverView>(this.baseUrl+'Utils/get-overview-data');
  }
  getUrl(){
    return   this.router.url;
  }
}
