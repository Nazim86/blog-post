import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {authRepository} from "../repositories/user-in-db-repository";
import { v4 as uuid } from 'uuid';
import add from "date-fns/add"
import {UserAccountDbType} from "../repositories/types/user-account-db-type";
import {emailManager} from "../managers/email-manager";
import {usersAccountsCollection} from "../db/db";
import {UserAccountViewType} from "../repositories/types/user-account-view-type";
import {tokenInDbRepository} from "../repositories/token-in-db-repository";
import {jwtService} from "./jwt-service";




export const authService = {

    async createNewUser(login: string, password: string, email: string): Promise<UserAccountDbType |null> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: UserAccountDbType = {
            _id: new ObjectId(),
            accountData: {
                login: login,
                passwordHash,
                passwordSalt,
                email: email,
                createdAt: new Date().toISOString()
            },
            emailConfirmation:{
                confirmationCode:uuid(),
                emailExpiration: add(new Date(),{
                    hours:1,
                    minutes:3
                }),
                isConfirmed:false,
                sentEmailsByDate:new Date()
            }
        }


        const createUser = await authRepository.createNewUser(newUser)


        try {
            await emailManager.sendConfirmationEmail(createUser.emailConfirmation.confirmationCode,
                createUser.accountData.email)

        }
        catch (e){
            return null
        }

        return createUser

    },

    async _generateHash(password: string, passwordSalt: string): Promise<string> {

        return await bcrypt.hash(password, passwordSalt)
    },

    async registrationConfirmation(code:string):Promise<boolean>{

        const user:UserAccountDbType | null = await authRepository.findUserByConfirmationCode(code)

        if(!user) return false
        if(user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false

        return await authRepository.updateConfirmation(user._id)
    },

    async resendEmail(email:string):Promise<string|boolean>{

        const user:UserAccountDbType | null = await authRepository.findUserByEmail(email)

        if(!user) return false
        if(user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false



        try {

            const newCode = uuid()
            await usersAccountsCollection.updateMany({_id:user._id},[{$set:{"emailConfirmation.confirmationCode":newCode}},
                {$set:{"emailConfirmation.sentEmailsByDate":new Date()}}])

            await emailManager.sendConfirmationEmail(newCode,user.accountData.email)
        }
        catch (e){
            return false
        }

        return true

    },

    async deleteUser(id: string): Promise<boolean> {
        return await authRepository.deleteUser(id)
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<UserAccountDbType | null> {

        const user: UserAccountDbType | null = await authRepository.checkCredentials(loginOrEmail)

        if (!user) return null

        if(!user.emailConfirmation.isConfirmed) return null

        const passwordSalt = user.accountData.passwordSalt;

        const passwordHash = await this._generateHash(password, passwordSalt);

        if (passwordHash !== user.accountData.passwordHash) return null

        return user
    },

    async findUserById (userId:string):Promise<UserAccountDbType |null>{
        return await authRepository.findUserById(userId)
    },

    async getCurrentUser (user:UserAccountDbType):Promise<UserAccountViewType>{

        return{
            email:user.accountData.email,
            login:user.accountData.login,
            userId:user._id.toString(),        }
    },

    async insertRefreshTokenMetaData (refreshToken:string, ip:string,deviceName:string){
        const {deviceId,lastActiveDate,userId,expiration} = await jwtService.getRefreshTokenMetaData(refreshToken)

// const updateResult = await tokenInDbRepository.updateDevice(deviceId,lastActiveDate)
//
//         if(!updateResult) {

            const refreshTokenMeta = {
                lastActiveDate: lastActiveDate,
                deviceId: deviceId,
                ip: ip,
                title: deviceName,
                userId: userId,
                expiration: expiration
            }
            await tokenInDbRepository.insertRefreshTokenMetaData(refreshTokenMeta)
    },


}



