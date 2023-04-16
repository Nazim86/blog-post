import {CommentsDbType} from "./types/comments-db-type";
import {CommentsViewType} from "./types/comments-view-type";
import {CommentModel} from "../db/db";
import {ObjectId} from "mongodb";

export const commentDbRepository = {

    async createPostComment(postComment:CommentsDbType,userId:string, userLogin:string):Promise<CommentsViewType>{
        const comment = await CommentModel.create(postComment)
        return{
            id: comment._id.toString(),
            content: postComment.content,
            commentatorInfo: {
                userId: userId,
                userLogin: userLogin
            },
            createdAt: postComment.createdAt,
            likesInfo:{
                likesCount:postComment.likesInfo.likesCount,
                dislikesCount: postComment.likesInfo.dislikesCount,
                myStatus:postComment.likesInfo.myStatus
            }
        }
    },

    async updateComment(commentId:string,content:string):Promise<boolean>{
        const result = await CommentModel.updateOne({_id:new ObjectId(commentId)},{$set:{content:content}})

        return result.matchedCount === 1
    },

    async deleteComment(commentId:string):Promise<boolean>{
        const result = await CommentModel.deleteOne({_id:new ObjectId(commentId)})

        return result.deletedCount ===1
    }
}