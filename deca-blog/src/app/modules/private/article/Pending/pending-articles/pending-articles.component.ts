import { Component, OnInit } from '@angular/core';
import { ActionDropdownData } from 'src/app/_models/action-dropdown-data';
import { PaginationMetaData } from 'src/app/_models/paginationMetaData';
import { PendingContributionModel } from 'src/app/_models/pendingContributionsModel';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
declare let alertify: any;
@Component({
  selector: 'app-pending-articles',
  templateUrl: './pending-articles.component.html',
  styleUrls: ['./pending-articles.component.css']
})
export class PendingArticlesComponent implements OnInit {

  contributions : PendingContributionModel[] = [];
  pageMetaData : PaginationMetaData;
  pageNumber : number = 1;
  perPage : number = 4;
  dropdownData: ActionDropdownData[];
  constructor(private articleService: ArticleService) {
    this.dropdownData = [
      {
        name: 'Publish Article',
        action: (actionData) => {
          alertify.confirm("Confirmation"," Are you sure you want to publish contribution?",
            () => {
              this.articleService.publishArticle(actionData).subscribe(
                (data) => {
                  this.getPendingContributions();
                  alertify.success("Contribution Published Successfully");
                },
                (error) =>{
                  alertify.error("An error occured please try again");
                }
              )
            },
            function(){
            });
        }
      }
    ]
   }

  ngOnInit(): void {
    this.getPendingContributions();
  }

  hanglePageChange(currentpage: number){
    this.pageNumber = currentpage;
    this.getPendingContributions()
  }

  getPendingContributions(){
    this.articleService.getPendingArticle(this.perPage, this.pageNumber).subscribe(
      (res:any)=>{
        this.pageMetaData = new PaginationMetaData();
        this.contributions = res.Data.Data;
        this.pageMetaData.Page = res.Data.MetaData.Page;
        this.pageMetaData.PerPage = res.Data.MetaData.PerPage;
        this.pageMetaData.Total = res.Data.MetaData.Total;
        this.pageMetaData.TotalPages = res.Data.MetaData.TotalPages
    })
  }

  handlePageChange(event){
    this.pageNumber = event;
    this.getPendingContributions();
  }

  handlePerPageChange(event){
    this.perPage = event;
    this.getPendingContributions()
  }

}
