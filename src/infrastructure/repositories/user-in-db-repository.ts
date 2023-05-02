import {ObjectId} from "mongodb";
import {HydratedUser, UserAccount} from "./types/user-account";
import {injectable} from "inversify";
import {UserModel} from "../../domain/UsersEntity";

@injectable()
export class UserRepository {

    async createNewUser(userDTO: UserAccount): Promise<UserAccount> {

        const smartUserModel = new UserModel(userDTO)
        await smartUserModel.save()
        return userDTO

    }

    async findUserByConfirmationCode(code: string): Promise<HydratedUser| null> {

        const user:HydratedUser |null= await UserModel.findOne(
            {"emailConfirmation.confirmationCode": code})
return user
    }

    async findUserByRecoveryCode(recoveryCode: string): Promise<UserAccount | null> {

        return UserModel.findOne(
            {"accountData.recoveryCode": recoveryCode})

    }

    async findUserByEmail(email: string) {

        return UserModel.findOne({"accountData.email": email})
    }

    async save(model:HydratedUser) {
        return await model.save();
    }

    async updateConfirmation(userId: ObjectId): Promise<boolean> {

        const result = await UserModel.updateOne({_id: userId}, {$set: {"emailConfirmation.isConfirmed": true}})
        return result.modifiedCount === 1
    }

    // async setNewConfirmationCode(userId: ObjectId): Promise<boolean> {
    //
    //     const result = await UserAccountModel.updateOne({_id: userId}, {$set: {"emailConfirmation.isConfirmed": true}})
    //     return result.modifiedCount === 1
    // }


    async updateUserAccountData(userId: ObjectId, passwordHash:string): Promise<boolean> {

        const result = await UserModel.updateOne({_id: userId}, {
            $set:
                {"accountData.passwordHash": passwordHash}})
        return result.modifiedCount === 1
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const result = await UserModel.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount === 1;
        } catch (e) {
            return false
        }

    }

    async findUserByLoginOrEmail(loginOrEmail: string): Promise<UserAccount | null> {
        return UserModel.findOne({$or: [{"accountData.login": loginOrEmail}, {"accountData.email": loginOrEmail}]})
    }

    async findUserById(userId: string): Promise<UserAccount | null> {
        const user = await UserModel.findOne({_id: new ObjectId(userId)})
        if (!user) return null
        return user


    }
}

