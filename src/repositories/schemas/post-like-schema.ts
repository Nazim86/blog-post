import {Schema} from "mongoose";
import {ObjectId} from "mongodb";
import {LikeEnum} from "../enums/like-enum";
import {PostLikesDbType} from "../types/post-likes-db-type";

export const PostLikeSchema = new Schema<PostLikesDbType>({

    _id: {type: ObjectId, required: true},
    postId: {type: String, required: true},
    userId: {type: String, required: true},
    addedAt: {type: String, required: true},
    status: {type: String, required: true, enum: LikeEnum}

})