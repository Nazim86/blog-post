import {ObjectId} from "mongodb";



type EmailConfirmationType={

    confirmationCode:string
    emailExpiration: Date
    isConfirmed:boolean

}

type UserType = {
    login: string
    passwordHash:string
    passwordSalt:string
    email: string
    createdAt: string
}
export type UserAccountViewType = {
    _id:ObjectId
    accountData: UserType
    emailConfirmation:EmailConfirmationType

}