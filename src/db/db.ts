import {MongoClient} from 'mongodb'
import {BlogsDbType} from "../types/blogs-db-type";
import {PostsDbType} from "../types/posts-db-type";
import * as Process from "process";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


const url = Process.env.MONGO_URL

if (!url){
    throw new Error("Url does not found!")
}
export const client = new MongoClient(url)
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