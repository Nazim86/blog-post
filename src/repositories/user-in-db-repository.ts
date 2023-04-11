import {usersAccountsCollection} from "../db/db";

import {ObjectId} from "mongodb";
import {UserAccountDbType} from "./types/user-account-db-type";

export const userRepository = {
    async createNewUser(newUser: UserAccountDbType): Promise<UserAccountDbType> {

        await usersAccountsCollection.insertOne(newUser)
        return newUser

    },

    async findUserByConfirmationCode(code: string): Promise<UserAccountDbType | null> {

        return await usersAccountsCollection.findOne(
            {"emailConfirmation.confirmationCode": code})

    },

    async findUserByRecoveryCode(recoveryCode: string): Promise<UserAccountDbType | null> {

        return await usersAccountsCollection.findOne(
            {"accountData.recoveryCode": recoveryCode})

    },

    async findUserByEmail(email: string) {

        return await usersAccountsCollection.findOne({"accountData.email": email})
    },

    async updateConfirmation(userId: ObjectId): Promise<boolean> {

        const result = await usersAccountsCollection.updateOne({_id: userId}, {$set: {"emailConfirmation.isConfirmed": true}})
        return result.modifiedCount === 1
    },


    async updateUserAccountData(userId: ObjectId, passwordSalt:string, passwordHash:string): Promise<boolean> {

        const result = await usersAccountsCollection.updateMany({_id: userId}, {$set:
                {"accountData.passwordSalt":passwordSalt,"accountData.passwordHash":passwordHash}})
        return result.modifiedCount === 1
    },

    async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await usersAccountsCollection.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount === 1;
        } catch (e) {
            return false
        }

    },

    async checkCredentials(loginOrEmail: string): Promise<UserAccountDbType | null> {
        return await usersAccountsCollection.findOne({$or: [{"accountData.login": loginOrEmail}, {"accountData.email": loginOrEmail}]})
    },

    async findUserById(userId: string): Promise<UserAccountDbType | null> {
        const user = await usersAccountsCollection.findOne({_id: new ObjectId(userId)})
        if (!user) return null
        return user


    }
}