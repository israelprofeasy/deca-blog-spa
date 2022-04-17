import { Publisher } from "./Publisher";

export interface ContributionModel {
  ContributionId: string;
  ContributorId : string ;
  TopicId : string ;
  Topic : string ;
  SubTopic : string ;
  ArticleText : string ;
  Keywords : string ;
  CreatedAt : string ;
  IsPublish:boolean,
  Publisher : Publisher
}
