import {MongoClient} from 'mongodb'
import {BlogsDbType} from "../repositories/types/blogs-db-type";
import {PostsDbType} from "../repositories/types/posts-db-type";

import * as dotenv from 'dotenv'
import {CommentsDbType} from "../repositories/types/comments-db-type";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";
import {refreshTokenMetaDbType} from "../repositories/types/refreshToken-meta-db-type"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { CronJob } from 'cron';


dotenv.config()

const url = process.env.NODE_ENV === "test" ? 'mongodb://0.0.0.0:27017': process.env.MONGO_URL

if (!url){
    throw new Error("Url does not found!")
}
export const client = new MongoClient(url)
const db = client.db('blogPost')

export const blogsCollection = db.collection<BlogsDbType>("blogs")
export const postsCollection = db.collection<PostsDbType>("posts")
// export const usersCollection = db.collection<UserDbType>("users")
export const commentsCollection = db.collection<CommentsDbType>("comments")
export const usersAccountsCollection = db.collection<UserAccountDbType>("usersAccounts")
export const tokensCollection = db.collection<any>("validTokenList")


export const clearExpiredTokens = new CronJob('0 * * * * *', async () => {
    try {

        const query = { expiration: { $lte: new Date().getTime() } };
        if(!query){
            return
        }
        const result = await tokensCollection.deleteMany(query);
        console.log(`${result.deletedCount} expired tokens deleted`);
    } catch (err) {
        console.error(err);
    }
});




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