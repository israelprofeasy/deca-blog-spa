import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelatedArticleModel } from 'src/app/_models/relatedArticleModel';
import { ArticleService } from 'src/app/_services/_article_service/article.service';
declare let alertify: any;
@Component({
  selector: 'app-related-articles',
  templateUrl: './related-articles.component.html',
  styleUrls: ['./related-articles.component.css'],
})
export class RelatedArticlesComponent implements OnInit {
  articleId: string;
  constructor(private articleService: ArticleService, private route: ActivatedRoute) {}
  relatedArticlesDisplay: RelatedArticleModel[] = [];
  ngOnInit(): void {
    this.articleId = this.route.snapshot.params['id'];
    console.log(this.articleId)
    this.articleService.getRelatedArticles(this.articleId).subscribe(
      (result: any) => {
        if(!result.Data ==null){
          this.relatedArticlesDisplay = result.Data;
        }
      },
      () => {
        alertify.error('could not load related articles at the moment');
      }
    );
  }
  formatTopic(topic: string) {
    if (topic.length > 40) return topic.slice(0, 34) + '....';
    return topic;
  }

  checkImage(url: string) {
    if (url == null || url == '') return false;
    return true;
  }
}
