import {ObjectId} from "mongodb";
import bcrypt from 'bcrypt';
import {userRepository} from "../repositories/user-in-db-repository";
import {v4 as uuid} from 'uuid';
import add from "date-fns/add"
import {UserAccountDbType} from "../repositories/types/user-account-db-type";
import {emailManager} from "../managers/email-manager";
import {usersAccountsCollection} from "../db/db";
import {UserAccountViewType} from "../repositories/types/user-account-view-type";
import {tokenInDbRepository} from "../repositories/token-in-db-repository";
import {jwtService} from "./jwt-service";
import {passwordRecoveryMessage, registrationMessage} from "../repositories/email-messages-repo";

export const authService = {

    async createNewUser(login: string, password: string, email: string): Promise<UserAccountDbType | null> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: UserAccountDbType = {
            _id: new ObjectId(),
            accountData: {
                login: login,
                passwordHash,
                passwordSalt,
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
                isConfirmed: false,
                sentEmailsByDate: new Date()
            }
        }

        const createUser = await userRepository.createNewUser(newUser)

        try {
            console.log("confirmationCode",createUser.emailConfirmation.confirmationCode,)
            await emailManager.sendConfirmationEmail(createUser.emailConfirmation.confirmationCode,
                createUser.accountData.email, registrationMessage)

        } catch (e) {
            return null
        }

        return createUser

    },

    async _generateHash(password: string, passwordSalt: string): Promise<string> {

        return await bcrypt.hash(password, passwordSalt)
    },

    async registrationConfirmation(code: string): Promise<boolean> {

        const user: UserAccountDbType | null = await userRepository.findUserByConfirmationCode(code)

        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false

        return await userRepository.updateConfirmation(user._id)
    },

    async resendEmail(email: string): Promise<string | boolean> {

        const user: UserAccountDbType | null = await userRepository.findUserByEmail(email)

        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false

        try {
            const newCode = uuid()
            await usersAccountsCollection.updateMany({_id: user._id}, [{$set: {"emailConfirmation.confirmationCode": newCode}},
                {$set: {"emailConfirmation.sentEmailsByDate": new Date()}}])

            await emailManager.sendConfirmationEmail(newCode, user.accountData.email, registrationMessage)
        } catch (e) {
            return false
        }

        return true

    },

    async sendingRecoveryCode(email: string): Promise<boolean> {

        const user: UserAccountDbType | null = await userRepository.findUserByEmail(email)

        if (user) {

            try {
                const recoveryCode = uuid()
                console.log("Recovery code",recoveryCode)
                await usersAccountsCollection.updateMany({_id: user._id}, {$set:
                        {"accountData.recoveryCode": recoveryCode, "accountData.recoveryCodeExpiration":add(new Date(), {
                                hours: 1,
                                minutes: 3
                            })}})

                await emailManager.sendConfirmationEmail(recoveryCode, user.accountData.email, passwordRecoveryMessage)
            } catch (e) {
                return true
            }
        }
        return true
    },

    async setNewPasswordByRecoveryCode(newPassword: string, recoveryCode: string): Promise<boolean> {

        const user: UserAccountDbType | null = await userRepository.findUserByRecoveryCode(recoveryCode)

        if (!user) return false
        // if (user.emailConfirmation.isConfirmed) return false
        if (user.accountData.recoveryCode !== recoveryCode) return false
        if (user.accountData.recoveryCodeExpiration < new Date()) return false

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(newPassword, passwordSalt)

        return await userRepository.updateUserAccountData(user._id, passwordSalt, passwordHash)
    },

    async deleteUser(id: string): Promise<boolean> {
        return await userRepository.deleteUser(id)
    },

    async checkCredentials(loginOrEmail: string, password: string): Promise<UserAccountDbType | null> {

        const user: UserAccountDbType | null = await userRepository.checkCredentials(loginOrEmail)

        if (!user) return null

        if (!user.emailConfirmation.isConfirmed) return null

        const passwordSalt = user.accountData.passwordSalt;

        const passwordHash = await this._generateHash(password, passwordSalt);

        if (passwordHash !== user.accountData.passwordHash) return null

        return user
    },

    async findUserById(userId: string): Promise<UserAccountDbType | null> {
        return await userRepository.findUserById(userId)
    },

    async getCurrentUser(user: UserAccountDbType): Promise<UserAccountViewType> {

        return {
            email: user.accountData.email,
            login: user.accountData.login,
            userId: user._id.toString(),
        }
    },

    async insertRefreshTokenMetaData(refreshToken: string, ip: string, deviceName: string) {
        const {deviceId, lastActiveDate, userId, expiration} = await jwtService.getRefreshTokenMetaData(refreshToken)


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



