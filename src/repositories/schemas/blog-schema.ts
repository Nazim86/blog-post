import mongoose from "mongoose";
import {BlogsDbType} from "../types/blogs-db-type";
import {ObjectId} from "mongodb";

export const blogSchema = new mongoose.Schema<BlogsDbType>({
    _id: {type:ObjectId,required:true},
    name: {type:String,required:true},
    description: {type:String,required:true},
    websiteUrl:{type:String,required:true},
    createdAt: {type:String,required:true},
    isMembership: {type:Boolean,required:true},
})

