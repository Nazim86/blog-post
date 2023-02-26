import {ObjectId} from "mongodb";

export type PostsViewType={
    id:string
    title: string
    shortDescription : string
    content : string
    blogId: string
    blogName: string
}