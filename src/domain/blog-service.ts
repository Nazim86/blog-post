
import {ObjectId} from "mongodb";
import {BlogsViewType} from "../repositories/types/blogs-view-type";
import {BlogsDbType} from "../repositories/types/blogs-db-type";
import {blogRepository} from "../repositories/blog-in-db-repository";




export const blogService = {

    async createBlog(name: string, description: string, websiteUrl: string): Promise<BlogsViewType> {

        const newBlog: BlogsDbType = {
            _id: new ObjectId(),
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false


        }

        const result = await blogRepository.createBlog(newBlog)


        return result

    },




    async getBlog(): Promise<BlogsViewType[]> {

        const getBlog = await blogRepository.getBlog()

        return getBlog
    },

    async getBlogById(id: string): Promise<BlogsViewType | null> {

        const foundBlog = await blogRepository.getBlogById(id)
        return foundBlog

    },

    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogRepository.updateBlog(id,name,description,websiteUrl)
        return result

    },

    async deleteBlogById(id: string): Promise<boolean> {
        const result = await blogRepository.deleteBlogById(id)

        return result
    }


}