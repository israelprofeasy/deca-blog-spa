export interface ArticleTopics {
    TopicId: string;
    Topic: string;
    CoverPhotoUrl: string;
    Countributions?: number;
    Author?: Author;
    DateCreated?: string;
}

export interface Author{
    FullName: string;
}

export interface PageParameters{
    pageNumber: number,
    perPage: number
}
