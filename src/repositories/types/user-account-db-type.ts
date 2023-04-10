import {ObjectId} from "mongodb";



type EmailConfirmationType={

    confirmationCode:string
    emailExpiration: Date
    isConfirmed:boolean
    sentEmailsByDate:Date

}



type UserType = {
    login: string
    passwordHash:string
    passwordSalt:string
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