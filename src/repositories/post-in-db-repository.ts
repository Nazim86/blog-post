import {postsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {PostsViewType} from "../types/posts-view-type";
import {PostsDbType} from "../types/posts-db-type";
import {postMapping} from "../mapping/post-mapping";



export const postRepository = {
    async createPost(title: string, shortDescription:string, content: string, blogId:string):Promise<PostsViewType> {
        const newId = new Date();

        const newPost: PostsDbType ={
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: newId.toString()
        }

        const result =  await postsCollection.insertOne(newPost)
        return {
            id: result.insertedId.toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: newId.toString()
        }
    },

    async getPost():Promise<PostsViewType[]>{
        const getposts = await postsCollection.find({}).toArray()
        return postMapping(getposts)
    },

    async getPostById(id:ObjectId): Promise<PostsViewType |boolean>{
        const postById = await postsCollection.findOne({_id:id})
        if (postById) {
            return {
                id: postById._id.toString(),
                title: postById.title,
                shortDescription: postById.shortDescription,
                content: postById.content,
                blogId: postById.blogId,
                blogName: postById.blogName
            }
        }else{
            return false
        }
    },

    async updatePost(id:ObjectId,title: string, shortDescription:string, content: string, blogId:string): Promise<boolean> {

        const result = await postsCollection.updateOne({_id:id},{$set:
                {title: title,
                shortDescription: shortDescription,
                content: content,
                blogId:blogId}})


        return result.matchedCount===1
    },

    async deletePostById(id:ObjectId):Promise <boolean>{
        const result = await postsCollection.deleteOne({_id:id})
         return result.deletedCount===1

    }


}