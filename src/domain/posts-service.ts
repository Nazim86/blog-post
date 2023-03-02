import {ObjectId} from "mongodb";
import {PostsViewType} from "../types/posts-view-type";
import {PostsDbType} from "../types/posts-db-type";
import {postRepository} from "../repositories/post-in-db-repository";




export const postService = {

    async createPost(title: string, shortDescription:string, content: string, blogId:string):Promise<PostsViewType> {
        const newId = new Date();

        const newPost: PostsDbType ={
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: newId.toString(),
            createdAt: new Date().toISOString()

        }

        const result =  await postRepository.createPost(newPost)

        return result

    },

    async createPostForBlog (title: string, shortDescription: string, content: string, blogId:string, blogName:string): Promise<PostsViewType> {


        const createPostForBlog: PostsDbType = {
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId:blogId,
            blogName: blogName,
            createdAt: new Date().toISOString()

        }

        const result = await postRepository.createPostForBlog(createPostForBlog)

        return result

    },

    async getPost():Promise<PostsViewType[]>{
        const getposts = await postRepository.getPost()
        return getposts
    },

    async getPostById(id:ObjectId): Promise<PostsViewType |boolean> {
        const postById = await postRepository.getPostById(id)
        return postById
    }
    ,

    async updatePost(id:ObjectId,title: string, shortDescription:string, content: string, blogId:string): Promise<boolean> {

        const result = await postRepository.updatePost(id,title,shortDescription,content,blogId)


        return result
    },

    async deletePostById(id:ObjectId):Promise <boolean>{
        const result = postRepository.deletePostById(id)
        return result

    }


}