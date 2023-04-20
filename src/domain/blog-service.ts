import {ObjectId} from "mongodb";
import {BlogsViewType} from "../repositories/types/blogs-view-type";
import {BlogsDbType} from "../repositories/types/blogs-db-type";
import {blogRepository} from "../repositories/blog-in-db-repository";


class BlogService {

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsViewType> {

        const newBlog: BlogsDbType = new BlogsDbType(
            new ObjectId(),
            name,
            description,
            websiteUrl,new Date().toISOString(),
            false)

        return await blogRepository.createBlog(newBlog)
    }

    async getBlog(): Promise<BlogsViewType[]> {

        return await blogRepository.getBlog()
    }

    async getBlogById(id: string): Promise<BlogsViewType | null> {

        return await blogRepository.getBlogById(id)
    }

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        return await blogRepository.updateBlog(id, name, description, websiteUrl)
    }

    async deleteBlogById(id: string): Promise<boolean> {
        return await blogRepository.deleteBlogById(id)
    }
}

export const blogService = new BlogService()
