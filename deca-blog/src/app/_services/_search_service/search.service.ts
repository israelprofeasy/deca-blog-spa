import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseModel } from 'src/app/_models/IResponseModel';
import { RequestParams } from 'src/app/_models/requestParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  results: any;
  baseUrl :string = environment.apiUrl;
  url: string = "";
  

  constructor(private http: HttpClient) { }

  //makes the HTTP request to get the resources and returns the response as observable; 
  
  public getPopularArticles(requestParams: RequestParams): Observable<any>{
    return this.http.get(
      this.baseUrl + "article/get-popular-articles?PageNumber="+requestParams.PageNumber+"&PerPage="+requestParams.PerPage).pipe(
      map(response=>{
        return this.results = response;        
      })
    );
  }

  public getArticles(page, perPage): Observable<any>{
    let params: any;

    params = {PageNumber: page, PerPage: perPage }

    this.url = this.baseUrl +  "article/get-articles";

    return this.http.get(this.url,  {params}).pipe(
      map(response => {        
        return this.results = response;
      })
    );
  }
  
  public searchEntries(term, filter, page, perPage): Observable<any>{    

    if (term === "" ){
      console.log("Not defined");
      return of(null);
    }else{
      let params: any;

      this.url = this.baseUrl +  "ArticleSearch/" + filter;

      if(filter === "search-by-keyword"){
        params = {KeyWords: term, PageNumber: page, PerPage: perPage }
      }
      else if(filter === "search-by-author"){
        params = {AuthorName: term, PageNumber: page, PerPage: perPage }
      }
      else{
        params = {TopicName: term, PageNumber: page, PerPage: perPage }
      }

      return this.http.get(this.url,  {params}).pipe(
        map(response => {
          return this.results = response;
        })
      );
    }
    
  }

  //returns the response for the first method
  public _searchEntries(term, filter, pageNumber, perPage){
    return this.searchEntries(term, filter, pageNumber, perPage);
  }
}
