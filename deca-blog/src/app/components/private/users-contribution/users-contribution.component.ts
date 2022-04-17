import { Component, OnInit } from '@angular/core';
import { ContributionModel } from 'src/app/_models/contributions';
import { PaginationMetaData } from '../../../_models/paginationMetaData';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
import { UserService } from 'src/app/_services/_user_service/user.service';
import { ActionDropdownData } from 'src/app/_models/action-dropdown-data';
import { Router } from '@angular/router';
declare let alertify: any;
@Component({
  selector: 'app-users-contribution',
  templateUrl: './users-contribution.component.html',
  styleUrls: ['./users-contribution.component.css']
})
export class UsersContributionComponent implements OnInit {

  contributions : ContributionModel[] = [];
  pageMetaData! : PaginationMetaData;
  pageNumber : number = 1;
  perPage : number = 10;
  dropdownData: ActionDropdownData[];
  constructor(private articleService: ArticleService, private userService : UserService) {
    this.dropdownData = [
      {
        name: 'Edit Story',
        action: (actionData) => {console.log("edit story is clicked", actionData)}
      },
      {
        name: 'Delete Story',
        action: (actionData) => {
          alertify.confirm("Delete","Delete Contribution?",
            () => {
              this.articleService.deleteContribution(actionData).subscribe(
                (data) => {
                  this.getContributions();
                  alertify.success("Contribution deleted");
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
    this.getContributions();
  }

  hanglePageChange(currentpage: number){
    this.pageNumber = currentpage;
    this.getContributions()
  }

  getContributions(){
    this.articleService.getContributionsById(this.userService.User.Id , this.pageNumber, this.perPage).subscribe(
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
    this.getContributions();
  }

  handlePerPageChange(event){
    this.perPage = event;
    this.getContributions()
  }

}
