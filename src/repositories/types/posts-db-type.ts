import {ObjectId} from "mongodb";

export class PostsDbType{
    constructor(
        public _id: ObjectId,
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string | null,
        public createdAt: string) {}
}

// export type PostsDbType={
//     _id:ObjectId
//     title: string
//     shortDescription : string
//     content : string
//     blogId: string
//     blogName: string | null
//     createdAt:string
// }