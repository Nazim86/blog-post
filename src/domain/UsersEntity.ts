import mongoose, {HydratedDocument, Model, Schema} from "mongoose";
import {
    AccountData,
    EmailConfirmation, HydratedUser,
    UserAccount
} from "../infrastructure/repositories/types/user-account";

import {v4 as uuid} from "uuid";
import add from "date-fns/add";


export type UserAccountDbMethodsType = {
    canBeConfirmed: (code:string) => boolean
    confirm: (code:string) => void
}
export type UserModelType = Model<UserAccount, {}, UserAccountDbMethodsType>;

type UserModelStaticType = Model<UserAccount> &{
    makeInstance (login:string, email:string, passwordHash:string):HydratedUser
}


type UserModelFullType = UserModelType & UserModelStaticType
// {
//     createWithFullName(name: string): Promise<HydratedDocument<IUser, IUserMethods>>;
// }

const EmailConfirmationSchema = new Schema<EmailConfirmation>({
    confirmationCode:{type:String,required:true},
    emailExpiration: {type:Date,required:true},
    isConfirmed:{type:Boolean,required:true},
})
const UserSchema = new Schema<AccountData>({
    login: {type:String,required:true},
    passwordHash:{type:String,required:true},
    email: {type:String,required:true},
    createdAt: {type:String,required:true},
    recoveryCode:{type:String,required:true},
    recoveryCodeExpiration:{type:Date,required:true}
})

export const UserAccountSchema = new Schema<UserAccount,UserModelFullType,UserAccountDbMethodsType>({
    // _id:{type:ObjectId,required:true},
    accountData: {type:UserSchema,required:true},
    emailConfirmation:{type:EmailConfirmationSchema, required:true}
})


UserAccountSchema.static('makeInstance', function  makeInstance (login:string, email:string, passwordHash:string) {
    const emailConfirmationType = new EmailConfirmation(
        uuid(),
        add(new Date(), {
            hours: 1,
            minutes: 3
        }),
        false)

    const accountData = new AccountData(login, passwordHash, email, new Date().toISOString(), uuid(), add(new Date(), {
        hours: 1,
        minutes: 3
    }))
    return new UserModel({accountData:accountData,emailConfirmation:emailConfirmationType});
});


UserAccountSchema.method('canBeConfirmed', function canBeConfirmed(code:string) {
    const that = this as UserAccount
    return that.emailConfirmation.confirmationCode === code &&
        that.emailConfirmation.emailExpiration > new Date()
});

UserAccountSchema.method('confirm', function confirm(code:string) {
    const that = this as HydratedDocument<UserAccount, UserAccountDbMethodsType>
    if(!that.canBeConfirmed(code)) throw new Error("Account can't be confirm")
    if (that.emailConfirmation.isConfirmed) throw new Error("Already confirmed account can't be confirmed again")
    that.emailConfirmation.isConfirmed = true

});

// export const UserModel = mongoose.model<UserAccountDbType,UserModelFullType>('usersAccounts',UserAccountSchema)

export const UserModel: UserModelFullType = mongoose.model<UserAccount, UserModelFullType>('usersAccounts', UserAccountSchema);
