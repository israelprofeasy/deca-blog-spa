import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ArticleTopics } from "src/app/_models/articleTopics";
import { environment } from "src/environments/environment";

@Injectable()
export class ArticleTopicService{
    baseUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }
    getTopics(perPage:number, page:number): Observable<ArticleTopics[]>{
        let loggedInUserId : string = "02e3d19d-9e32-47e2-96f0-f6202b7510ef";
        const params = new HttpParams()
              .set('perPage', perPage)
              .set('pageNumber' , page)
              .set('authorId' , loggedInUserId);
    
              console.log(params.toString());
        return this.httpClient.get<ArticleTopics[]>(this.baseUrl+"get-articles-by-author"
        ,{params});
      }
}