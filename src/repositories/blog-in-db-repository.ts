import { blogsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {blogMapping} from "../mapping/blog-mapping";
import {BlogsViewType} from "./types/blogs-view-type";
import {BlogsDbType} from "./types/blogs-db-type";



export const blogRepository = {

    async createBlog(newBlog: BlogsDbType): Promise<BlogsViewType> {


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

    async getBlogById(id: string): Promise<BlogsViewType | null> {
        try {
            const foundBlog = await blogsCollection.findOne({_id: new ObjectId(id)})
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
                return null
            }
        } catch (e) {
            return null
        }

    },
    async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {

        try {
            const result = await blogsCollection.updateOne({_id: new ObjectId(id)},
                {$set: {name: name, description: description, websiteUrl: websiteUrl}}
            )
            return result.matchedCount === 1
        }

        catch (e) {
            return false
        }


    },

    async deleteBlogById(id: string): Promise<boolean> {
        try {
            const result = await blogsCollection.deleteOne({_id: new ObjectId(id)},)
            return result.deletedCount === 1

        }catch (e){
            return false
        }


    }


}


