import mongoose from "mongoose";


import * as dotenv from 'dotenv'
import {BlogSchema} from "../infrastructure/repositories/schemas/blog-schema";
import {PostSchema} from "../infrastructure/repositories/schemas/post-schema";
import {CommentSchema} from "../infrastructure/repositories/schemas/comment-schema";
import {TokenSchema} from "../infrastructure/repositories/schemas/token-schema";
import {IpSchema} from "../infrastructure/repositories/schemas/ip-schema";
import {LikeSchema} from "../infrastructure/repositories/schemas/like-schema";
import {PostLikeSchema} from "../infrastructure/repositories/schemas/post-like-schema";




dotenv.config()

// const url = process.env.NODE_ENV === "test" ? 'mongodb://0.0.0.0:27017': process.env.MONGO_URL
// const url = process.env.NODE_ENV === "test" ? 'mongodb://127.0.0.1:27017': process.env.MONGOOSE_URL

const mongooseAtlasUrl = process.env.MONGOOSE_URL
const testUrl = 'mongodb://127.0.0.1:27017/blogPost'

// if (!url){
//     throw new Error("Url does not found!")
// }
const dbName = 'blogPost'
// export const client = new MongoClient(url)
// const db = client.db('blogPost')

//mongoose models
export const BlogModel = mongoose.model("blogs",BlogSchema)
export const PostModel = mongoose.model('posts',PostSchema)
// export const UserAccountModel = mongoose.model<UserAccountDbType,UserModelType>('usersAccounts',UserAccountSchema)
export const CommentModel = mongoose.model("comments", CommentSchema)
export const LikeModel = mongoose.model("likes", LikeSchema)
export const PostLikeModel = mongoose.model("postLikes", PostLikeSchema)
export const TokenModel = mongoose.model("validTokenList",TokenSchema)
export const IpModel = mongoose.model('ipData',IpSchema)


// //mongoDb collections
// export const blogsCollection = db.collection<BlogsDbType>("blogs")
// export const postsCollection = db.collection<PostsDbType>("posts")
// // export const usersCollection = db.collection<UserDbType>("users")
// export const commentsCollection = db.collection<CommentsDbType>("comments")
// export const UserAccountModel = db.collection<UserAccountDbType>("usersAccounts")
// export const tokensCollection = db.collection<RefreshTokenMetaDbType>("validTokenList")
// export const IpModel = db.collection<IpDataType>("ipAddresses")

export async function runDb (){

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017'+'/'+ dbName);
        // await mongoose.connect(testUrl);

        // await client.connect();
        // await client.db('blogPost').command({ping:1})
        console.log("Connected to mongo server successfully")
    }
    catch {
        console.log("Can't connect to Db")
        // await client.close()
        await mongoose.connection.close()
    }
}