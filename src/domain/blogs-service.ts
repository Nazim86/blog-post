import {blogsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {blogMapping} from "../mapping/blog-mapping";
import {BlogsViewType} from "../types/blogs-view-type";
import {BlogsDbType} from "../types/blogs-db-type";



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

        const result = await blogsCollection.insertOne(newBlog)


        return {
            id: result.insertedId.toString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: newBlog.createdAt,
            isMembership: newBlog.isMembership
        }

    },

    async getBlog(): Promise<BlogsViewType[]> {

        const array = await blogsCollection.find({}).toArray()

        return blogMapping(array)
    },

    async getBlogById(_id: ObjectId): Promise<BlogsViewType | boolean> {

        const foundBlog = await blogsCollection.findOne({_id: _id})
        if (foundBlog) {
            return {
                id: foundBlog._id.toString(),
                name: foundBlog.name,
                description: foundBlog.description,
                websiteUrl: foundBlog.websiteUrl,
                createdAt: foundBlog.createdAt,
                isMembership: foundBlog.isMembership
            }
        } else {
            return false
        }
    },
    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
        const result = await blogsCollection.updateOne({_id: new ObjectId(id)},
            {$set: {name: name, description: description, websiteUrl: websiteUrl}}
        )
        return result.matchedCount === 1

    },

    async deleteBlogById(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)},)


        return result.deletedCount === 1
    }


}