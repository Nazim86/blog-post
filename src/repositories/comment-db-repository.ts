import {CommentsDbType} from "./types/comments-db-type";
import {CommentsViewType} from "./types/comments-view-type";
import {CommentModel, LikeModel} from "../db/db";
import {ObjectId, UpdateResult} from "mongodb";
import {LikeEnum} from "./enums/like-enum";

export const commentDbRepository = {

    async createPostComment(postComment:CommentsDbType,userId:string, userLogin:string):Promise<CommentsViewType>{
        const comment:CommentsDbType = await CommentModel.create(postComment)

        const commentId = comment._id.toString()

        let myStatus = 'None'
        if (userId) {
            const likeInDb = await LikeModel.findOne({commentId, userId})
            if (likeInDb) {
                myStatus = likeInDb.status
            }
        }

        const likesCount = await LikeModel.countDocuments({commentId, status: LikeEnum.Like})
        const dislikesCount = await LikeModel.countDocuments({commentId, status: LikeEnum.Dislike})

        return{
            id: comment._id.toString(),
            content: postComment.content,
            commentatorInfo: {
                userId: userId,
                userLogin: userLogin
            },
            createdAt: postComment.createdAt,
            likesInfo:{
                likesCount,
                dislikesCount,
                myStatus:myStatus
            }
        }
    },

    async updateComment(commentId:string,content:string):Promise<boolean>{
        const result = await CommentModel.updateOne({_id:new ObjectId(commentId)},{$set:{content:content}})

        return result.matchedCount === 1
    },

    async updateLikeStatus(commentId:string,userId:string,likeStatus:LikeEnum):Promise<boolean>{

        const result:UpdateResult = await LikeModel.updateOne({commentId,userId}, {$set: {addedAt: new Date().toISOString(), status: likeStatus}}, {upsert: true})

        return result.upsertedCount===1 || result.modifiedCount ===1
    },



    async deleteComment(commentId:string):Promise<boolean>{
        const result = await CommentModel.deleteOne({_id:new ObjectId(commentId)})

        return result.deletedCount ===1
    }
}