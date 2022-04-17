import { FormGroup } from '@angular/forms';
import { IPostComment } from './../../_models/IPostComment';
import { IComment } from './../../_models/apiResponseModels/Comment';
import { IResponse } from 'src/app/_models/apiResponseModels/Response';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})

export class CommentService {
  baseUrl: string = environment.apiUrl+"comment/";
  pageNumber: number = 1;
  perPage: number = 20;
  constructor(private httpClient: HttpClient) { }
  

  getAllComments() {
    let params = new HttpParams()
      .set('pageNumber', this.pageNumber)
      .set('perPage', this.perPage);
    return this.httpClient.get<IResponse<IComment>>(this.baseUrl + 'get-all-comments', { params });
  }

  postComment(topicId:string , model: IPostComment) {
   
    return this.httpClient.post(this.baseUrl + "add-comment/"+topicId, model, httpOptions);
  }

  getCommentByTopicId(topicId:string) {
    let params = new HttpParams()
      .set('pageNumber', this.pageNumber)
      .set('perPage', this.perPage)
      .set('topicId', topicId);
    return this.httpClient.get<IResponse<IComment>>(this.baseUrl+'get-comments-by-topicId', { params });
  }
}
