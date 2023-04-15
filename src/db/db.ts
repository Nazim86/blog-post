import {MongoClient} from 'mongodb'
import mongoose from "mongoose";
import {BlogsDbType} from "../repositories/types/blogs-db-type";
import {PostsDbType} from "../repositories/types/posts-db-type";

import * as dotenv from 'dotenv'
import {CommentsDbType} from "../repositories/types/comments-db-type";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";
import {RefreshTokenMetaDbType} from "../repositories/types/refresh-token-meta-db-type";
import {IpDataType} from "../repositories/types/ip-type";
import {BlogSchema} from "../repositories/schemas/blog-schema";
import {PostSchema} from "../repositories/schemas/post-schema";
import {UserAccountSchema} from "../repositories/schemas/user-schema";
import {CommentSchema} from "../repositories/schemas/comment-schema";
import {TokenSchema} from "../repositories/schemas/token-schema";
import {IpSchema} from "../repositories/schemas/ip-schema";


// getting-started.js


dotenv.config()

const url = process.env.NODE_ENV === "test" ? 'mongodb://0.0.0.0:27017': process.env.MONGO_URL

if (!url){
    throw new Error("Url does not found!")
}
const dbName = 'blogPost'
export const client = new MongoClient(url)
const db = client.db('blogPost')

//mongoose models
export const BlogModel = mongoose.model("blogs",BlogSchema)
export const PostModel = mongoose.model('posts',PostSchema)
export const UserAccountModel = mongoose.model('usersAccounts',UserAccountSchema)
export const CommentModel = mongoose.model("comments", CommentSchema)
export const TokenModel = mongoose.model("validTokenList",TokenSchema)
export const IpModel = mongoose.model('ipData',IpSchema)


//mongoDb collections
export const blogsCollection = db.collection<BlogsDbType>("blogs")
export const postsCollection = db.collection<PostsDbType>("posts")
// export const usersCollection = db.collection<UserDbType>("users")
export const commentsCollection = db.collection<CommentsDbType>("comments")
export const usersAccountsCollection = db.collection<UserAccountDbType>("usersAccounts")
export const tokensCollection = db.collection<RefreshTokenMetaDbType>("validTokenList")
export const ipCollection = db.collection<IpDataType>("ipAddresses")


// main().catch(err => console.log(err));
//
// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/test');
//
//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

export async function runDb (){

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/blogPost');
        await client.connect();
        await client.db('blogPost').command({ping:1})
        console.log("Connected to mongo server successfully")
    }
    catch {
        console.log("Can't connect to Db")
        await client.close()
        await mongoose.connection.close()
    }
}