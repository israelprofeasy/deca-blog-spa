export interface FullArticleModel {
    Topic ? : Topic; 
    Tags ? : Set<string>;
    Contributors ? : Contributor[];
    Articles ? : SubTopic[];
    TotalLikes: number;
    TotalComments: number;
}
interface Topic{
    TopicId ? : string;
    TopicName: string;
    Abstract: string;
    Category: ArticleCategory;
    PublicId: string;
    PhotoUrl: string;
    Date: Date;
}

interface Contributor{
    FullName: string;
    Id: string;
} 

interface SubTopic{
    SubId: string;
    SubTopicName: string;
    Text: string;
    Publisher: Publisher;
    Date: Date;
    Contributor_: Contributor_;
}

interface Publisher{
    AuthorId: string;
    FullName: string;
}

interface Contributor_{
    AuthorId: string;
    FullName: string;
}

interface ArticleCategory{
    Id: string;
    Name: string;
}

