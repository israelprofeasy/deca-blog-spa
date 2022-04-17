import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestParams } from 'src/app/_models/requestParams';
import { IGetArticleModel } from '../../../_models/IGetArticleModel';
import { SearchService } from '../../../_services/_search_service/search.service';

@Component({
  selector: 'app-search-preview',
  templateUrl: './search-preview.component.html',
  styleUrls: ['./search-preview.component.css']
})
export class SearchPreviewComponent implements OnInit {

  term:string;
  results: IGetArticleModel[];
  searchTerm: any;
  loading: boolean;
  errorMessage: any;
  total:any = 0;
  articleTotal:any = 0;
  filter: any = "search-by-topic-name";
  requestParams: RequestParams = { PageNumber : 1 , PerPage : 10 };

  constructor(
    private searchService: SearchService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(param =>{ 
      if(param.searchTerm == null){
        this.getPopularArticles();
      }
      else{
        this.searchService.getArticles(this.requestParams.PageNumber, this.requestParams.PerPage).subscribe((res:any)=>{

          this.results = res.Data.Data;
          this.articleTotal = res.Data.MetaData.Total;
                     
          this.route.params.subscribe(params =>{
            if(params.searchTerm)
              this.term = params.searchTerm[0].toUpperCase() + params.searchTerm.substring(1).toLowerCase();
              this.results = this.results
                            .filter(res => res.Topic.toLowerCase()
                            .includes(params.searchTerm.toLowerCase()));
              this.total = this.results.length;
          }) 
        })
      }
    })
    
  }
  
  pageChanged(event): void {
    this.requestParams.PageNumber = event;
    this.onSubmit();
  }

  getPopularArticles(){
    this.searchService.getPopularArticles(this.requestParams).subscribe((res:any)=>{
      this.results = res.Data.Data;
      this.articleTotal = res.Data.MetaData.Total;
    })
  }

  onSubmit(){
    this.term = this.searchTerm[0].toUpperCase() + this.searchTerm.substring(1).toLowerCase();

    this.searchService._searchEntries(this.searchTerm, this.filter, this.requestParams.PageNumber, this.requestParams.PerPage).subscribe((res:any) =>{
      this.results = res.Data.Data;
      this.total = res.Data.MetaData.Total;
    })
  }
}
