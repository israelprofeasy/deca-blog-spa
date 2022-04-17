import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleTopics } from 'src/app/_models/articleTopics';
import { PaginationMetaData } from 'src/app/_models/paginationMetaData';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
declare let alertify
@Component({
  selector: 'app-articletopics',
  templateUrl: './articletopics.component.html',
  styleUrls: ['./articletopics.component.css']
})
export class ArticletopicsComponent implements OnInit {
  topics: ArticleTopics[];
  pageData: PaginationMetaData
  perPage: number = 4;
  pageNumber: number = 1;
  loading : boolean = true;
  hasData : boolean = false;


  constructor(private articleService : ArticleService,private router: Router) { 
    this.pageData = new PaginationMetaData();
  }

  ngOnInit(): void {
    this.getTopics();
  }

  getTopics(){
    this.loading = true;
    this.articleService.getUserTopics(this.perPage, this.pageNumber).subscribe(
      (data: any) => { 
      if( data.Data.Data.length > 0) 
            this.hasData = true;
      this.loading =false;      
      this.topics = data.Data.Data;
      console.log(this.topics)
      let pData = data.Data.MetaData;
      this.pageData.Page = pData.Page;
      this.pageData.PerPage = pData.PerPage;
      this.pageData.Total = pData.Total;
      this.pageData.TotalPages = pData.TotalPages;
   }, errors => {
     alertify.error("colud not load user article topics at the moment")
     this.loading = false;
    });
  }

  perPageChanged(event){
    if(this.perPage == event)
    {
      return;
    }

    this.perPage == event;
    this.getTopics();
  }

  pageChanged(event){
    this.pageNumber = event;
    this.getTopics();
  }
}
