import mongoose from "mongoose";

export const IpSchema = new mongoose.Schema ({
    endPoint: {type:String, required:true},
    ipAddress: {type:String, required:true},
    issuedAt: {type:Number, required:true},
    attempts: {type:Number, required:true},
})
