import { PopularArticleAuthorModel } from './PopularArticleAuthorModel';

export interface PopularArticleModel {
  TopicId: string;
  Topic: string;
  abstract: string;
  tags: string;
  CoverPhotoUrl: string;
  Author: PopularArticleAuthorModel;
  DateCreated: string;
  dateUpdated: string;
}
