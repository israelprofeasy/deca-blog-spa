import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleToAddModel } from '../../_models/articleToAddModule';
import { CategoryService } from './category.service';
import { environment } from '../../../environments/environment';
import { ArticleTopics } from 'src/app/_models/articleTopics';
import { PopularArticleModel } from 'src/app/_models/popularArticleModel';
import { ContributionToAddModel } from 'src/app/_models/contributionToAddModel';
import { UserService } from '../_user_service/user.service';
import { RequestParams } from 'src/app/_models/requestParams';
import { IResponse } from 'src/app/_models/apiResponseModels/Response';
import { IArticleResponse } from 'src/app/_models/apiResponseModels/ArticleResponse';
import { ApiResponse } from 'src/app/_models/apiResponseModels/apiResponse';
import { ChartData } from 'src/app/_models/apiResponseModels/chart-data';
import { ContributionModel } from 'src/app/_models/contributions';
import { PendingContributionModel } from 'src/app/_models/pendingContributionsModel';
import { RelatedArticleModel } from 'src/app/_models/relatedArticleModel';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  baseUrl: string = environment.apiUrl + 'Article/';

  userObj: any = {};

  constructor(
    private httpClient: HttpClient,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  PostArticle(model: ArticleToAddModel): Observable<any> {
    const formData: any = new FormData();
    formData.append('Keywords', model.keywords);
    formData.append('Photo', model.photo);
    formData.append('Topic', model.topic);
    formData.append('Abstract', model.abstract);
    formData.append('CategoryId', model.category);
    formData.append('SubTopic', model.subtopic);
    formData.append('ArtlcleText', model.articleText);
    return this.httpClient.post(this.baseUrl + 'add-article', formData);
  }

  getUserTopics(perPage: number, page: number): Observable<ArticleTopics[]> {
    let loggedInUserId: string = this.userService.User.Id;
    const params = new HttpParams()
      .set('perPage', perPage)
      .set('pageNumber', page)
      .set('authorId', loggedInUserId);

    console.log(params.toString());
    return this.httpClient.get<ArticleTopics[]>(
      this.baseUrl + 'get-articles-by-author',
      { params }
    );
  }

  getUserArticles(
    userId: string,
    perPage: number,
    page: number
  ): Observable<ArticleTopics[]> {
    const params = new HttpParams()
      .set('authorId', userId)
      .set('perPage', perPage)
      .set('pageNumber', page);

    return this.httpClient.get<ArticleTopics[]>(
      this.baseUrl + 'get-articles-by-author',
      { params }
    );
  }

  getArticleById(id: string) {
    return this.httpClient.get(this.baseUrl + 'get-article-by-id/' + id);
  }

  getPopularArticles(
    pageNumber: number,
    perPage: number,
    numberOfArticles: number
  ): Observable<any> {
    console.log(this.baseUrl);
    var params = new HttpParams()
      .set('perPage', perPage)
      .set('pageNumber', pageNumber)
      .set('totalArticles', numberOfArticles);
    return this.httpClient.get(this.baseUrl + 'get-popular-articles', {
      params,
    });
  }
  PostContribution(
    model: ContributionToAddModel,
    topicId: string
  ): Observable<any> {
    console.log('reaching' + topicId);
    return this.httpClient.post(
      this.baseUrl + 'add-contribution/' + topicId,
      model
    );
  }
  getAllArticles(): Observable<any> {
    let popularArticlesApi = 'get-articles?PageNumber=1&PerPage=10000000';
    return this.httpClient.get(this.baseUrl + popularArticlesApi);
  }

  public getArticle(requestParams : RequestParams) : Observable<IResponse<IArticleResponse>>{
    return this.httpClient.get<IResponse<IArticleResponse>>(this.baseUrl +"get-article-topics-with-published-articles?PageNumber="+requestParams.PageNumber+"&PerPage="+requestParams.PerPage)
  }

  getContributionsById(id: string, pageNumber: number, perPage: number) {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('perPage', perPage);
    return this.httpClient.get(
      this.baseUrl + 'get-articles-by-contributorid/' + id,
      { params }
    );
  }
  deleteContribution(id: string) {
    return this.httpClient.delete(this.baseUrl + 'delete-contribution/' + id);
  }
  public getChartData(year: number) {
    return this.httpClient.get<ApiResponse<ChartData>>(
      this.baseUrl + 'article/articles-published-by-month?year=' + year
    );
  }

  public likeArticle(id: string) {
    return this.httpClient.post(this.baseUrl + 'like-article-topic/' + id, {});
  }
  getPendingArticle(
    perPage: number,
    page: number
  ): Observable<PendingContributionModel[]> {
    const params = new HttpParams()
      .set('pageNumber', page)
      .set('perPage', perPage);
    return this.httpClient.get<PendingContributionModel[]>(
      this.baseUrl + 'get-pending-articles',
      { params }
    );
  }
  public publishArticle(id: string) {
    return this.httpClient.patch(this.baseUrl + 'publish-article/' + id, {});
  }
  getRelatedArticles(id: string): Observable<RelatedArticleModel> {
    let relatedArticlesApi = 'get-related-articles/' + id;
    return this.httpClient.get(this.baseUrl + relatedArticlesApi);
  }
}
