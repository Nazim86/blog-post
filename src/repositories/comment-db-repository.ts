import {CommentsDbType} from "./types/comments-db-type";
import {CommentsViewType} from "./types/comments-view-type";
import {commentsCollection} from "../db/db";
import {ObjectId} from "mongodb";

export const commentDbRepository = {

    async createPostComment(postComment:CommentsDbType,userId:string, userLogin:string):Promise<CommentsViewType>{
        const comment = await commentsCollection.insertOne(postComment)
        return{
            id: comment.insertedId.toString(),
            content: postComment.content,
            commentatorInfo: {
                userId: userId,
                userLogin: userLogin
            },
            createdAt: postComment.createdAt

        }
    },

    async updateComment(commentId:string,content:string):Promise<boolean>{
        const result = await commentsCollection.updateOne({_id:new ObjectId(commentId)},{$set:{content:content}})

        return result.matchedCount === 1
    },

    async deleteComment(commentId:string):Promise<boolean>{
        const result = await commentsCollection.deleteOne({_id:new ObjectId(commentId)})

        return result.deletedCount ===1
    }
}