import {ObjectId} from "mongodb";



export type EmailConfirmationType={

    confirmationCode:string
    emailExpiration: Date
    isConfirmed:boolean
}



export type UserType = {
    login: string
    passwordHash:string
    email: string
    createdAt: string
    recoveryCode:string
    recoveryCodeExpiration:Date
}
export type UserAccountDbType = {
    _id:ObjectId
    accountData: UserType
    emailConfirmation:EmailConfirmationType
}