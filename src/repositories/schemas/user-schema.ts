import mongoose from "mongoose";
import {EmailConfirmationType, UserAccountDbType, AccountDataType} from "../types/user-account-db-type";
import {ObjectId} from "mongodb";
const { Schema } = mongoose;

const EmailConfirmationSchema = new Schema<EmailConfirmationType>({
    confirmationCode:{type:String,required:true},
    emailExpiration: {type:Date,required:true},
    isConfirmed:{type:Boolean,required:true},
})

const UserSchema = new Schema<AccountDataType>({
    login: {type:String,required:true},
    passwordHash:{type:String,required:true},
    email: {type:String,required:true},
    createdAt: {type:String,required:true},
    recoveryCode:{type:String,required:true},
    recoveryCodeExpiration:{type:Date,required:true}
})

export const UserAccountSchema = new Schema<UserAccountDbType>({
    _id:{type:ObjectId,required:true},
    accountData: {type:UserSchema,required:true},
    emailConfirmation:{type:EmailConfirmationSchema, required:true}
})

