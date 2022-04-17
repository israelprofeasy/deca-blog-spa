import { IGetAuthorModel } from "./IGetAuthorModel";

export interface IGetArticleModel{
    TopicId: string;
    Topic: string;
    Abstract: string;
    Tags: string[];
    CoverPhotoUrl: string;
    Author: IGetAuthorModel;
    DateCreated: Date
}