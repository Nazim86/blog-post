import {MongoClient} from 'mongodb'
import {BlogsDbType} from "../types/blogs-db-type";
import {PostsDbType} from "../types/posts-db-type";

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017";

export const client = new MongoClient(mongoUri)

const db = client.db('blogPost')

export const blogsCollection = db.collection<BlogsDbType>("blogs")
export const postsCollection = db.collection<PostsDbType>("posts")

export async function runDb (){

    try{
        await client.connect()
        await client.db('blogPost').command({ping:1})
        console.log("Connected to mongo server successfully")
    }
    catch {
        console.log("Can't connect to Db")
        await client.close()
    }
}