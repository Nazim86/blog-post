import mongoose from "mongoose";

export const TokenSchema = new mongoose.Schema({

    lastActiveDate: {type:String, required:true},
    deviceId: {type:String, required:true},
    ip:{type:String, required:true},
    title:{type:String, required:true},
    userId:{type:String, required:true},
    expiration:{type:String, required:true}

});