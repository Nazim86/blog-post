import {UserAccountModel} from "../db/db";

import {ObjectId} from "mongodb";
import {UserAccountDbType} from "./types/user-account-db-type";
import {injectable} from "inversify";

@injectable()
export class UserRepository {

    async createNewUser(newUser: UserAccountDbType): Promise<UserAccountDbType> {

        await UserAccountModel.create(newUser)
        return newUser

    }

    async findUserByConfirmationCode(code: string): Promise<UserAccountDbType | null> {

        return UserAccountModel.findOne(
            {"emailConfirmation.confirmationCode": code})

    }

    async findUserByRecoveryCode(recoveryCode: string): Promise<UserAccountDbType | null> {

        return UserAccountModel.findOne(
            {"accountData.recoveryCode": recoveryCode})

    }

    async findUserByEmail(email: string) {

        return UserAccountModel.findOne({"accountData.email": email})
    }

    async updateConfirmation(userId: ObjectId): Promise<boolean> {

        const result = await UserAccountModel.updateOne({_id: userId}, {$set: {"emailConfirmation.isConfirmed": true}})
        return result.modifiedCount === 1
    }


    async updateUserAccountData(userId: ObjectId, passwordHash:string): Promise<boolean> {

        const result = await UserAccountModel.updateOne({_id: userId}, {
            $set:
                {"accountData.passwordHash": passwordHash}})
        return result.modifiedCount === 1
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await UserAccountModel.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount === 1;
        } catch (e) {
            return false
        }

    }

    async findUserByLoginOrEmail(loginOrEmail: string): Promise<UserAccountDbType | null> {
        return UserAccountModel.findOne({$or: [{"accountData.login": loginOrEmail}, {"accountData.email": loginOrEmail}]})
    }

    async findUserById(userId: string): Promise<UserAccountDbType | null> {
        const user = await UserAccountModel.findOne({_id: new ObjectId(userId)})
        if (!user) return null
        return user


    }
}

