import {userRepositoryOld} from "../repositories/user-in-db-repository-old";
import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {UserViewType} from "../repositories/types/user-view-type";
import {UserByIdType} from "../repositories/types/user-by-id-type";
import {v4 as uuid} from "uuid";
import add from "date-fns/add";
import {EmailConfirmationType, UserAccountDbType, UserType} from "../repositories/types/user-account-db-type";
import {userRepository} from "../repositories/user-in-db-repository";

class UserService{
    async createNewUser(login: string, password: string, email: string): Promise<UserViewType> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const emailConfirmationType = new EmailConfirmationType(
            uuid(),
            add(new Date(), {
                hours: 1,
                minutes: 3
            }),
            true)

        const userType = new UserType(login,passwordHash,email,new Date().toISOString(),uuid(),add(new Date(), {
                        hours: 1,
                        minutes: 3
                    }))

        const newUser:UserAccountDbType = new UserAccountDbType(new ObjectId(),
            userType,emailConfirmationType)

        // const newUser:UserAccountDbType = {
        //     _id: new ObjectId(),
        //     accountData: {
        //         login: login,
        //         passwordHash,
        //         email: email,
        //         createdAt: new Date().toISOString(),
        //         recoveryCode:uuid(),
        //         recoveryCodeExpiration:add(new Date(), {
        //             hours: 1,
        //             minutes: 3
        //         })
        //     },
        //     emailConfirmation: {
        //         confirmationCode: uuid(),
        //         emailExpiration: add(new Date(), {
        //             hours: 1,
        //             minutes: 3
        //         }),
        //         isConfirmed: true,
        //     }
        // }

        // return await userRepositoryOld.createNewUser(newUser) old version

        await userRepository.createNewUser(newUser)

        return {
            id: newUser._id.toString(),
            login: newUser.accountData.login,
            email: newUser.accountData.email,
            createdAt: newUser.accountData.createdAt
        }

    }

    async _generateHash(password: string, passwordSalt: string): Promise<string> {

        return await bcrypt.hash(password, passwordSalt)
    }

    async deleteUser(id: string): Promise<boolean> {
        return await userRepositoryOld.deleteUser(id)
    }

    async checkCredentials(loginOrEmail: string, password: string): Promise<boolean> {

        const user: UserAccountDbType | null = await userRepositoryOld.findUserByLoginOrEmail(loginOrEmail)

        if (!user) return false

        if (!user.emailConfirmation.isConfirmed) return false

        return bcrypt.compare(password, user.accountData.passwordHash)

    }

    async findUserById (userId:string):Promise<UserByIdType |null>{
        return await userRepositoryOld.findUserById(userId)
    }


}

export const userService = new UserService()