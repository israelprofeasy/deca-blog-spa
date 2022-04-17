export interface IComment {
    Id: string;
    CommentText: string;
    TopicId: string;
    Votes: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    Commentator: ICommentator;
}

export interface ICommentator {
    CommentatorId: string;
    FullName: string;
    PhotoUrl: string;
}