import {MongoClient} from 'mongodb'
import {BlogsDbType} from "../types/blogs-db-type";
import {PostsDbType} from "../types/posts-db-type";

const mongoUri = "mongodb+srv://nazim86:12345@cluster0.2p7d5fb.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(mongoUri)
// process.env.mongoURI ||
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