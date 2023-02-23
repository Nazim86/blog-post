import {client} from "./db";
import {blogsType} from "./blog-in-db-repository";
import {promises} from "dns";

type postsType={
    id:string
    title: string
    shortDescription : string
    content : string
    blogId: string
    blogName: string
}

export const posts: Array<postsType> = []

export const postRepository = {
    async createPost(title: string, shortDescription:string, content: string, blogId:string):Promise<postsType> {
        const newId = new Date();

        const newPost: postsType ={
            id: newId.toISOString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: newId.toString()
        }

        await client.db("blogPost").collection("posts").insertOne(newPost)
        return newPost
    },

    async getPost():Promise<postsType[]>{
        return client.db("blogPost").collection<postsType>("posts").find({}).toArray()
    },

    async getPostById(id:string): Promise<postsType[]>{
        return await client.db("blogPost").collection<postsType>("posts").find({id:id}).toArray()
    },

    async updatePost(id:string,title: string, shortDescription:string, content: string, blogId:string): Promise<boolean> {
        const updateById = {
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId:blogId

        }
        await client.db("blogPost").collection<postsType>("posts").updateOne({id:id},{$set:{title: title,
                shortDescription: shortDescription,
                content: content,
                blogId:blogId}})

        return true
    },

    async deletePostById(id:string):Promise <boolean>{
        await client.db("blogPost").collection("posts").deleteOne({id:id})
        return true

    }


}