import {blogsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {blogMapping} from "../mapping/blog-mapping";
import {BlogsViewType} from "../types/blogs-view-type";
import {BlogsDbType} from "../types/blogs-db-type";
import {blogRepository} from "../repositories/blog-in-db-repository";



export const blogsService = {

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

    async getBlogById(_id: ObjectId): Promise<BlogsViewType | boolean> {

        const foundBlog = await blogRepository.getBlogById(_id)
      return foundBlog

    },

    async updateBlog(id: ObjectId, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogRepository.updateBlog(id,name,description,websiteUrl)
        return result

    },

    async deleteBlogById(id: ObjectId): Promise<boolean> {
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)},)


        return result.deletedCount === 1
    }


}