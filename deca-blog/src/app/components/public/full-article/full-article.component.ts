import { ModalService } from './../../../_services/modal.service';
import { AuthService } from './../../../_services/_auth_service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullArticleModel } from '../../../_models/fullArticleModel';
import { ArticleService } from '../../../_services/_article_service/article.service';

@Component({
  selector: 'app-full-article',
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.css','./more-arrows.css']
})
export class FullArticleComponent implements OnInit {
  location = '';
  article: FullArticleModel;
  Topicdate: string;
  error: any;
  categoryId: string;
  loading = false;
  likedArticle: boolean = false;
  totalComments: number;
  totalLikes: number;
  userLoggedIn:boolean=false;
  scrollDown =false;

  constructor(
    private _articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    let articleId = this.route.snapshot.params['id'];
    this.location = this.router.url;
    this._articleService.getArticleById(articleId).subscribe(
      (response: any) => {
        this.article = response.Data;
        this.Topicdate = response.Data.Topic.Date;
        this.categoryId = response.Data.Topic.Category.Id;
        this.totalLikes = response.Data.TotalLikes;
        this.totalComments = response.Data.TotalComments;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
    this.userLoggedIn = this.authService.isLoggedIn;
  }

  isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }

  likeArticle() {
    let articleId = this.route.snapshot.params['id'];
    this._articleService.likeArticle(articleId).subscribe(
      (response: any) => {
        this.likedArticle = response != null;
        console.log(response);
        if (response.Status) {
          this.totalLikes += 1;
        } else {
          this.totalLikes -= 1;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  gotoToView(id:string){
   let  el = document.getElementById(id);
   el.scrollIntoView({block:'center'});
  }


  checkScrollStatus(elId){
    let  el = document.getElementById(elId);

     if(this.checkScrollEndTop(el)){
      this.scrollDown = true;
     }

     if(this.checkScrollEndbottom(el)){
      this.scrollDown = false;
     }


  }

  scrollTop(eleId){
    let el = document.getElementById(eleId)

    if(!this.checkScrollEndTop(el)){
      el.scrollTop += 260;
    }
    this.scrollDown = true;
  }


  checkScrollEndTop(el:HTMLElement ){
    if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {
      return true;
    }
    return false;
  }



  scrollBottom(eleId){
    let el = document.getElementById(eleId);
    if(!this.checkScrollEndbottom(el)){
      el.scrollTop -= 260;
    }
    this.scrollDown = false;

  }


    checkScrollEndbottom(el:HTMLElement ){
      if (el.offsetHeight + el.scrollTop <= el.scrollHeight) {
        return true;
      }
      return false;
    }

    bodyScroll(){
      alert('hell0')
    }
  
    handleCommentAddedEvent(event: number, tag: HTMLSpanElement){
      tag.innerText = ""+event;
    }
}

