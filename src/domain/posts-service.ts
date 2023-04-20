import {ObjectId} from "mongodb";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {postRepository} from "../repositories/post-in-db-repository";
import {blogRepository} from "../repositories/blog-in-db-repository";
import {PostsDbType} from "../repositories/types/posts-db-type";


class PostsService{

    async createPost(title: string, shortDescription:string, content: string, blogId:string):Promise<PostsViewType | null> {

        const blog = await blogRepository.getBlogById(blogId)
        if (!blog) return null

        const newPost = new PostsDbType(new ObjectId(),title,shortDescription,content,blogId,blog.name,new Date().toISOString())

        return await postRepository.createPost(newPost)
    }

    async createPostForBlog (title: string, shortDescription: string, content: string, blogId:string): Promise<PostsViewType | null> {

        const blogById = await blogRepository.getBlogById(blogId)

        if(!blogById) return null

        const createPostForBlog = new PostsDbType(new ObjectId(),title,shortDescription,content,blogId.toString(),blogById.name,new Date().toISOString())

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