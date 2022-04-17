import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment'

@Injectable()
export class CategoryService {

    baseUrl :string= environment.apiUrl + 'category/';

constructor(private httpClient:HttpClient) { }
    GetCategory(): Observable<any>{
        return this.httpClient.get(this.baseUrl+"get-categories?page=1&perPage=200000");
    }
}


