import {ObjectId} from "mongodb";

export type PostsDbType={
    _id:ObjectId
    title: string
    shortDescription : string
    content : string
    blogId: string
    blogName: string
}