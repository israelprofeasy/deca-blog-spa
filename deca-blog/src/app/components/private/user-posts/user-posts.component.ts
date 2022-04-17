import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticleResponse } from 'src/app/_models/apiResponseModels/ArticleResponse';
import { IGetArticleModel } from 'src/app/_models/IGetArticleModel';
import { RequestParams } from 'src/app/_models/requestParams';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
import { AuthService } from 'src/app/_services/_auth_service/auth.service';
import { UserService } from 'src/app/_services/_user_service/user.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  articleInfo: IGetArticleModel[];
  requestParams: RequestParams = { PageNumber : 1 , PerPage : 7 };
  userId: string;
  loggedIn: boolean = false;

  constructor( 
    private articleService: ArticleService,
    private authService: AuthService,
    private userService: UserService, 
    private route : ActivatedRoute
  ) { }

  onScroll(){
    this.requestParams.PerPage+=7;
    this.ngOnInit();
  }

  ngOnInit(): void {

    if(this.authService.isLoggedIn) this.loggedIn = !this.loggedIn;

    this.route.params.subscribe(param =>{    
      if(param.id == null && this.loggedIn == true){
        this.userId = this.userService.User.Id;
      }
      else{
        this.userId = param.id
      }
    })

    this.getUserArticles();   
    
  }

  getUserArticles(){
    this.articleService.getUserArticles(this.userId, this.requestParams.PerPage, this.requestParams.PageNumber).subscribe((res)=>{
      let getData: IArticleResponse = res["Data"];      
      this.articleInfo = getData.Data;
    });
  }
}
