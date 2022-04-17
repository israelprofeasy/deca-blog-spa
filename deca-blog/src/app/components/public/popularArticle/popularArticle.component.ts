import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_services/modal.service';
import { AuthService } from 'src/app/_services/_auth_service/auth.service';
import { UserService } from 'src/app/_services/_user_service/user.service';
import { PopularArticleModel } from '../../../_models/popularArticleModel';
import { ArticleService } from '../../../_services/_article_service/article.service';

declare let alertify: any;
@Component({
  selector: 'app-popularArticle',
  templateUrl: './popularArticle.component.html',
  styleUrls: ['./popularArticle.component.css'],
})
export class PopularArticleComponent implements OnInit {
  constructor(private articleService: ArticleService, 
  private router : Router, 
  private userService: UserService, 
  public modalService: ModalService,
  public authService: AuthService) {}
  //Display data
  popularArticlesDisplay: PopularArticleModel[] = [];
  numberOfArticles = 7;
  loading: boolean;

  isUserLoggedIn(){
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.loading = true;
    this.articleService
      .getPopularArticles(1, 5, this.numberOfArticles)
      .subscribe(
        (result: any) => {
          this.popularArticlesDisplay = result.Data.Data;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  // formatDate(date: string){
  //   console.log(date)
  //   let stringDate = new Date(date).toString().split(" ");
  //   return stringDate[1]+" "+stringDate[2]+" "+stringDate[3];
  // }

  formatTopic(topic: string) {
    if (topic.length > 40) return topic.slice(0, 34) + '....';
    return topic;
  }

  checkImage(url: string) {
    if (url == null || url == '') return false;
    return true;
  }
}
