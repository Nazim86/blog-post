import {Schema} from "mongoose";
import {ObjectId} from "mongodb";
import {LikesDbType} from "../types/likes-db-type";
import {LikeEnum} from "../enums/like-enum";

export const LikeSchema = new Schema<LikesDbType>({

    _id: {type: ObjectId, required: true},
    commentId: {type: String, required: true},
    userId: {type: String, required: true},
    addedAt: {type: String, required: true},
    status: {type: String, required: true, enum: LikeEnum}

})