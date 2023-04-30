import {PostsViewType} from "../repositories/types/posts-view-type";
import {PostRepository} from "../repositories/post-in-db-repository";
import {BlogRepository} from "../repositories/blog-in-db-repository";
import {PostsDbType} from "../repositories/types/posts-db-type";
import {PostsQueryRepo} from "../query-repositories/posts-query-repo";
import {UserRepository} from "../repositories/user-in-db-repository";
import {injectable} from "inversify";
import {ObjectId} from "mongodb";


@injectable()
export class PostService {

    private blogRepository:BlogRepository
    // private postRepository:PostRepository
    private postQueryRepo: PostsQueryRepo
    private userRepository: UserRepository


    constructor(protected postRepository:PostRepository) {
        this.blogRepository = new BlogRepository()
        // this.postRepository = new PostRepository()
        this.postQueryRepo = new PostsQueryRepo()
        this.userRepository = new UserRepository()

    }

    async createPost(title: string, shortDescription:string, content: string, blogId:string):Promise<PostsViewType | null> {

        const blog = await this.blogRepository.getBlogById(blogId)
        if (!blog) return null

        const newPost = new PostsDbType(new ObjectId(),title,shortDescription,content,blogId,blog.name,new Date().toISOString(),
            {likesCount:0,dislikesCount:0,myStatus:"None",newestLikes:[]})

        return await this.postRepository.createPost(newPost)
    }

    async createPostForBlog (title: string, shortDescription: string, content: string, blogId:string): Promise<PostsViewType | null> {

        const blogById = await this.blogRepository.getBlogById(blogId)

        if(!blogById) return null

        const createPostForBlog = new PostsDbType(new ObjectId(),title,shortDescription,content,blogId.toString(),blogById.name,new Date().toISOString(),
            {likesCount:0,dislikesCount:0,myStatus:"None",newestLikes:[]})

        return await this.postRepository.createPostForBlog(createPostForBlog)
    }

    // async getPostById(postId:string,userId?:string): Promise<PostsViewType |boolean> {
    //     return await this.postQueryRepo.getPostById(postId,userId)
    // }

    async updatePost(id:string,title: string, shortDescription:string, content: string, blogId:string): Promise<boolean> {

        return await this.postRepository.updatePost(id, title, shortDescription, content, blogId)
    }

    async updatePostLikeStatus(postId:string, userId:string, likeStatus:string){

        const getPost:PostsViewType | boolean = await this.postQueryRepo.getPostById(postId,userId)

        if (!getPost) return false

        const getUser = await this.userRepository.findUserById(userId)

        let login = "undefined"

        if(getUser){
            login = getUser.accountData.login
        }

        return await this.postRepository.updatePostLikeStatus(postId,userId,likeStatus,login)
    }

    async deletePostById(id:string):Promise <boolean>{
        return this.postRepository.deletePostById(id)
    }
}
