import {userRepositoryOld} from "../repositories/user-in-db-repository-old";
import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {UserViewType} from "../repositories/types/user-view-type";
import {UserByIdType} from "../repositories/types/user-by-id-type";
import {v4 as uuid} from "uuid";
import add from "date-fns/add";
import {UserAccountDbType} from "../repositories/types/user-account-db-type";
import {userRepository} from "../repositories/user-in-db-repository";



export const userService = {

    async createNewUser(login: string, password: string, email: string): Promise<UserViewType> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser = {
            _id: new ObjectId(),
            accountData: {
                login: login,
                passwordHash,
                email: email,
                createdAt: new Date().toISOString(),
                recoveryCode:uuid(),
                recoveryCodeExpiration:add(new Date(), {
                    hours: 1,
                    minutes: 3
                })
            },
            emailConfirmation: {
                confirmationCode: uuid(),
                emailExpiration: add(new Date(), {
                    hours: 1,
                    minutes: 3
                }),
                isConfirmed: true,
                sentEmailsByDate: new Date()
            }
        }

        // return await userRepositoryOld.createNewUser(newUser) old version

        await userRepository.createNewUser(newUser)

        return {
            id: newUser._id.toString(),
            login: newUser.accountData.login,
            email: newUser.accountData.email,
            createdAt: newUser.accountData.createdAt
        }

    },

    async _generateHash(password: string, passwordSalt: string): Promise<string> {

        return await bcrypt.hash(password, passwordSalt)
    },

    async deleteUser(id: string): Promise<boolean> {
        return await userRepositoryOld.deleteUser(id)
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<boolean> {

        const user: UserAccountDbType | null = await userRepositoryOld.findUserByLoginOrEmail(loginOrEmail)

        if (!user) return false

        if (!user.emailConfirmation.isConfirmed) return false

        return bcrypt.compare(password, user.accountData.passwordHash)

    },

    async findUserById (userId:string):Promise<UserByIdType |null>{
        return await userRepositoryOld.findUserById(userId)
    }


}