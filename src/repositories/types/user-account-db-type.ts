import {ObjectId} from "mongodb";



type EmailConfirmationType={

    confirmationCode:string,
    emailExpiration: Date
}

type UserType = {
    login: string
    passwordHash:string
    email: string
    createdAt: string
}
export type UserAccountDbType = {
    _id:ObjectId
    accountData: UserType
    emailConfirmation:EmailConfirmationType

}