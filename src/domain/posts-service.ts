import {ObjectId} from "mongodb";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {PostRepository} from "../repositories/post-in-db-repository";
import {BlogRepository} from "../repositories/blog-in-db-repository";
import {PostsDbType} from "../repositories/types/posts-db-type";
import {PostsQueryRepo} from "../query-repositories/posts-query-repo";


export class PostsService{

    private blogRepository:BlogRepository
    private postRepository:PostRepository
    private postQueryRepo: PostsQueryRepo

    constructor() {
        this.blogRepository = new BlogRepository()
        this.postRepository = new PostRepository()
        this.postQueryRepo = new PostsQueryRepo()

    }

    async createPost(title: string, shortDescription:string, content: string, blogId:string):Promise<PostsViewType | null> {

        const blog = await this.blogRepository.getBlogById(blogId)
        if (!blog) return null

        const newPost = new PostsDbType(new ObjectId(),title,shortDescription,content,blogId,blog.name,new Date().toISOString())

        return await this.postRepository.createPost(newPost)
    }

    async createPostForBlog (title: string, shortDescription: string, content: string, blogId:string): Promise<PostsViewType | null> {

        const blogById = await this.blogRepository.getBlogById(blogId)

        if(!blogById) return null

        const createPostForBlog = new PostsDbType(new ObjectId(),title,shortDescription,content,blogId.toString(),blogById.name,new Date().toISOString())

        return await this.postRepository.createPostForBlog(createPostForBlog)
    }

    // async getPost():Promise<PostsViewType[]>{
    //     return await this.postRepository.getPost()
    // }

    async getPostById(id:string): Promise<PostsViewType |boolean> {
        return await this.postQueryRepo.getPostById(id)
    }

    async updatePost(id:string,title: string, shortDescription:string, content: string, blogId:string): Promise<boolean> {

        return await this.postRepository.updatePost(id, title, shortDescription, content, blogId)
    }

    async updatePostLikeStatus(postId:string, userId:string, likeStatus:string){

        const getPost:PostsViewType | boolean = await this.postQueryRepo.getPostById(postId)

        if (!getPost) return false

        // return await this.postRepository.updatePostLikeStatus(postId,userId,likeStatus)
return true
    }

    async deletePostById(id:string):Promise <boolean>{
        return this.postRepository.deletePostById(id)
    }
}
