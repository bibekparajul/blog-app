import { IPost } from "./posts.model";

export interface IComment{
    id?: number;     
    postId: number; 
    post?: IPost; 
    commentMessage: string;
    authorName: string;
    createdAt: Date; 
}