import {PostModel} from "../db/db";
import {ObjectId} from "mongodb";
import {PostsViewType} from "./types/posts-view-type";
import {PostsDbType} from "./types/posts-db-type";
import {postMapping} from "../mapping/post-mapping";

export class PostRepository {

    async createPost(newPost: PostsDbType):Promise<PostsViewType> {

        const result =  await PostModel.create(newPost)

        return {
            id: result._id.toString(),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt
        }
    }

    async  createPostForBlog (createPostForBlog:PostsDbType): Promise<PostsViewType> {

        const result = await PostModel.create(createPostForBlog)

        return {
            id: result._id.toString(),
            title: createPostForBlog.title,
            shortDescription: createPostForBlog.shortDescription,
            content: createPostForBlog.content,
            blogId: createPostForBlog.blogId,
            blogName: createPostForBlog.blogName,
            createdAt: createPostForBlog.createdAt
        }

    }


    async getPost():Promise<PostsViewType[]>{
        const getPosts = await PostModel.find({}).lean()
        return postMapping(getPosts)
    }

    async  getPostById(id:string): Promise<PostsViewType |boolean>{
        const postById = await PostModel.findOne({_id: new ObjectId(id)})

        if (postById) {
            return {
                id: postById._id.toString(),
                title: postById.title,
                shortDescription: postById.shortDescription,
                content: postById.content,
                blogId: postById.blogId,
                blogName: postById.blogName,
                createdAt: postById.createdAt
            }
        }else{
            return false
        }
    }

    async updatePost(id:string,title: string, shortDescription:string, content: string, blogId:string): Promise<boolean> {

        try {
            const result = await PostModel.updateOne({_id: new ObjectId(id)},{$set:
                    {title: title,
                        shortDescription: shortDescription,
                        content: content,
                        blogId:blogId}})


            return result.matchedCount===1
        }
        catch (e){
            return false
        }

    }

    async deletePostById(id:string):Promise <boolean>{
        try {
            const result = await PostModel.deleteOne({_id: new ObjectId(id)})
            return result.deletedCount===1
        }
        catch (e){
            return false
        }
    }
}