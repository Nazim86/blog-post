import  {Schema} from "mongoose";
import {ObjectId} from "mongodb";
import {CommentsDbType} from "../types/comments-db-type";

export const CommentSchema = new Schema<CommentsDbType>({

    _id: {type:ObjectId,required:true},
    postId:{type:String,required:true},
    content: {type:String,required:true},
    commentatorInfo: {
        userId: {type:String,required:true},
        userLogin: {type:String,required:true},
    },
    createdAt: {type:String,required:true},
    likesInfo:{
        likesCount:{type:Number,required:true},
        dislikesCount: {type:Number,required:true},
        myStatus:{type:String,required:true}
    }

})