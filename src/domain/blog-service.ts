import {ObjectId} from "mongodb";
import {BlogsViewType} from "../repositories/types/blogs-view-type";
import {BlogsDbType} from "../repositories/types/blogs-db-type";
import {BlogRepository} from "../repositories/blog-in-db-repository";


export class BlogService {

    // private blogRepository: BlogRepository
    constructor(protected blogRepository:BlogRepository) {
        // this.blogRepository = new BlogRepository()
    }

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsViewType> {

        const newBlog: BlogsDbType = new BlogsDbType(
            new ObjectId(),
            name,
            description,
            websiteUrl,new Date().toISOString(),
            false)

        return await this.blogRepository.createBlog(newBlog)
    }

    async getBlog(): Promise<BlogsViewType[]> {

        return await this.blogRepository.getBlog()
    }

    async getBlogById(id: string): Promise<BlogsViewType | null> {

        return await this.blogRepository.getBlogById(id)
    }

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return await this.blogRepository.updateBlog(id, name, description, websiteUrl)
    }

    async deleteBlogById(id: string): Promise<boolean> {
        return await this.blogRepository.deleteBlogById(id)
    }
}
