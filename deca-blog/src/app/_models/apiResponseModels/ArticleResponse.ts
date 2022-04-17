import { IGetArticleModel } from "../IGetArticleModel";
import { MetaData } from "../metaData";

export interface IArticleResponse {
    Data: IGetArticleModel[];
    MetaData: MetaData;
}