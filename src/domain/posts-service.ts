import {ObjectId} from "mongodb";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {PostsDbType} from "../repositories/types/posts-db-type";
import {postRepository} from "../repositories/post-in-db-repository";
import {blogRepository} from "../repositories/blog-in-db-repository";


class PostsService{

    async createPost(title: string, shortDescription:string, content: string, blogId:string):Promise<PostsViewType | null> {

        const blog = await blogRepository.getBlogById(blogId)
        if (!blog) return null

        const newPost: PostsDbType ={
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()

        }

        return await postRepository.createPost(newPost)

    }


    async createPostForBlog (title: string, shortDescription: string, content: string, blogId:string): Promise<PostsViewType | null> {

        const blogById = await blogRepository.getBlogById(blogId)

        if(!blogById) return null

        const createPostForBlog: PostsDbType = {
            _id: new ObjectId(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId:blogId.toString(),
            blogName: blogById.name,
            createdAt: new Date().toISOString()

        }

        return await postRepository.createPostForBlog(createPostForBlog)

    }

    async getPost():Promise<PostsViewType[]>{
        return await postRepository.getPost()
    }

    async getPostById(id:string): Promise<PostsViewType |boolean> {
        return await postRepository.getPostById(id)
    }


    async updatePost(id:string,title: string, shortDescription:string, content: string, blogId:string): Promise<boolean> {

        return await postRepository.updatePost(id, title, shortDescription, content, blogId)
    }

    async deletePostById(id:string):Promise <boolean>{
        return postRepository.deletePostById(id)

    }


}

export const postService = new PostsService()