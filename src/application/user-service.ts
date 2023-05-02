import {userRepositoryOld} from "../infrastructure/repositories/user-in-db-repository-old";
import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {UserViewType} from "../infrastructure/repositories/types/user-view-type";
import {UserByIdType} from "../infrastructure/repositories/types/user-by-id-type";
import {v4 as uuid} from "uuid";
import add from "date-fns/add";
import {EmailConfirmation, UserAccount, AccountData} from "../infrastructure/repositories/types/user-account";
import {UserRepository} from "../infrastructure/repositories/user-in-db-repository";
import {injectable} from "inversify";


@injectable()
export class UserService{


    constructor(protected userRepository: UserRepository) {
    }

    async createNewUser(login: string, password: string, email: string): Promise<UserViewType> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const emailConfirmationType = new EmailConfirmation(
            uuid(),
            add(new Date(), {
                hours: 1,
                minutes: 3
            }),
            true)

        const accountData = new AccountData(login,passwordHash,email,new Date().toISOString(),uuid(),add(new Date(), {
                        hours: 1,
                        minutes: 3
                    }))

        const newUser:UserAccount = new UserAccount(new ObjectId(),
            accountData,emailConfirmationType)

        // return await userRepositoryOld.createNewUser(newUser) old version

        await this.userRepository.createNewUser(newUser)

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
        return await this.userRepository.deleteUser(id)
    }

    async checkCredentials(loginOrEmail: string, password: string): Promise<boolean> {

        const user: UserAccount | null = await this.userRepository.findUserByLoginOrEmail(loginOrEmail)

        if (!user) return false

        if (!user.emailConfirmation.isConfirmed) return false

        return bcrypt.compare(password, user.accountData.passwordHash)
    }

    async findUserById (userId:string):Promise<UserByIdType |null>{
        return await userRepositoryOld.findUserById(userId)
    }
}
