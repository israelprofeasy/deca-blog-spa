
export interface PendingContributionModel {
    ArticleId: string;
    ArticleText : string ;
    Contributor : Contributor ;
    DateCreated : string ;
    Keywords : string ;
    Subtopic : string ;
    Topic : string ;
    TopicId:string
}

interface Contributor{
    ContributorId:string;
    FirstName: string;
    LastName: string;
}