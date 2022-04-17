import { ArticleAuthorModel } from './articleAuthor';

export interface RelatedArticleModel {
  TopicId?: string;
  Topic?: string;
  Abstract?: string;
  CoverPhotoUrl?: string;
  Author?: ArticleAuthorModel;
  CreatedDate?: string;
}
