import {usersAccountsCollection, usersCollection} from "../db/db";

import {ObjectId} from "mongodb";
import {UserByIdType} from "./types/user-by-id-type";
import {UserAccountDbType} from "./types/user-account-db-type";

export const authRepository = {
    async createNewUser(newUser: UserAccountDbType): Promise<UserAccountDbType> {

        await usersAccountsCollection.insertOne(newUser)
        return newUser

    },

    async findUserByConfirmationCode(code: string):Promise<UserAccountDbType|null> {

        return await usersAccountsCollection.findOne(
            {"emailConfirmation.confirmationCode": code})

    },

    async findUserByEmail(email:string){

        return await usersAccountsCollection.findOne({"accountData.email":email})
    },

    async updateConfirmation(userId: ObjectId): Promise<boolean> {

        const result = await usersAccountsCollection.updateOne({_id: userId}, {$set: {"emailConfirmation.isConfirmed": true}})
        return result.modifiedCount === 1
    },

    async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await usersCollection.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount === 1;
        } catch (e) {
            return false
        }

    },

    async checkCredentials(loginOrEmail: string): Promise<UserAccountDbType | null> {
        return await usersAccountsCollection.findOne({$or: [{"accountData.login": loginOrEmail}, {"accountData.email": loginOrEmail}]})
    },

    async findUserById(userId: string): Promise<UserByIdType | null> {
        const result = await usersCollection.findOne({_id: new ObjectId(userId)})
        if (result) {
            return {
                email: result.email,
                login: result.login,
                userId: result._id.toString()
            }
        } else {
            return null
        }
    }
}