import { IComment } from "./comment.model";

export interface IPost{
    postID: number,
    title: string,
    description: string,
    image?: string,
    createdAt: string,
    authorName: string,
    // category: string,
    categoryId: number,
    comments?:IComment[];
}