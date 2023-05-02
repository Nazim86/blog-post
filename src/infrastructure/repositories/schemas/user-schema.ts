// import mongoose from "mongoose";
// import {
//     EmailConfirmationType,
//     UserAccountDbType,
//     AccountDataType,
//     UserModelType,
//     UserAccountDbMethodsType
// } from "../types/user-account-db-type";
// import {ObjectId} from "mongodb";
// import {UserAccountSchema} from "../../../domain/UsersEntity";
// const { Schema } = mongoose;
//
//
//
// const EmailConfirmationSchema = new Schema<EmailConfirmationType>({
//     confirmationCode:{type:String,required:true},
//     emailExpiration: {type:Date,required:true},
//     isConfirmed:{type:Boolean,required:true},
// })
//
// const UserSchema = new Schema<AccountDataType>({
//     login: {type:String,required:true},
//     passwordHash:{type:String,required:true},
//     email: {type:String,required:true},
//     createdAt: {type:String,required:true},
//     recoveryCode:{type:String,required:true},
//     recoveryCodeExpiration:{type:Date,required:true}
// })
//
// export const UserAccountSchema = new Schema<UserAccountDbType,UserModelType,UserAccountDbMethodsType>({
//     _id:{type:ObjectId,required:true},
//     accountData: {type:UserSchema,required:true},
//     emailConfirmation:{type:EmailConfirmationSchema, required:true}
// })
//
// UserAccountSchema.method('canBeConfirmed', function canBeConfirmed(code:string) {
//     const that = this as UserAccountDbType
//     return that.emailConfirmation.confirmationCode !== code &&
//         that.emailConfirmation.emailExpiration < new Date()
// });
//
