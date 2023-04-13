import mongoose from "mongoose";
import {PostsDbType} from "../types/posts-db-type";
import {ObjectId} from "mongodb";

export const PostSchema = new mongoose.Schema<PostsDbType>({
    _id: {type:ObjectId, required:true},
    title: {type:String, required:true},
    shortDescription : {type:String, required:true},
    content : {type:String, required:true},
    blogId: {type:String, required:true},
    blogName: {type:String, required:true}, // before blogname was string||null, I removed null will see how is working
    createdAt:{type:String, required:true}
})
