import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

import {passwordRecoveryMessage, registrationMessage} from "../managers/email-messages-repo";
import {JwtService} from "./jwt-service";
import {EmailManager} from "../managers/email-manager";
import {TokenInDbRepository} from "../infrastructure/repositories/token-in-db-repository";
import {injectable} from "inversify";
import {UserAccountDbMethodsType, UserModel} from "../domain/UsersEntity";
import {HydratedDocument} from "mongoose";
import {UserAccount} from "../infrastructure/repositories/types/user-account";
import {UserAccountViewType} from "../infrastructure/repositories/types/user-account-view-type";
import {UserRepository} from "../infrastructure/repositories/user-in-db-repository";

@injectable()
export class AuthService {


    constructor(protected userRepository: UserRepository,
                protected jwtService: JwtService,
                protected emailManager: EmailManager,
                protected tokenInDbRepository: TokenInDbRepository) {

    }

    async createNewUser(login: string, password: string, email: string): Promise<HydratedDocument<UserAccount, UserAccountDbMethodsType> | null> {

        const passwordHash = await bcrypt.hash(password, 10)

        const smartUserModel = UserModel.makeInstance(login, email, passwordHash)

        const createUser = await this.userRepository.save(smartUserModel)

        try {
            await this.emailManager.sendConfirmationEmail(createUser.emailConfirmation.confirmationCode,
                createUser.accountData.email, registrationMessage)

        } catch (e) {
            return null
        }

        return createUser

    }

    async registrationConfirmation(code: string): Promise<boolean> {
        const user: HydratedDocument<UserAccount, UserAccountDbMethodsType> | null = await this.userRepository.findUserByConfirmationCode(code)
        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false

        if (user.canBeConfirmed(code)) {
            user.confirm(code)
            const result = await this.userRepository.save(user)
            return !!result
        }
        return false
    }

    async resendEmail(email: string): Promise<string | boolean> {

        const user: UserAccount | null = await this.userRepository.findUserByEmail(email)

        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.emailExpiration < new Date()) return false

        try {
            const newCode = uuid()
            await UserModel.updateMany({_id: user._id}, {$set: {"emailConfirmation.confirmationCode": newCode}})

            await this.emailManager.sendConfirmationEmail(newCode, user.accountData.email, registrationMessage)
        } catch (e) {
            return false
        }

        return true
    }

    async sendingRecoveryCode(email: string): Promise<boolean> {

        const user: UserAccount | null = await this.userRepository.findUserByEmail(email)

        if (user) {

            try {
                const recoveryCode = uuid()

                await this.userRepository.setNewConfirmationCode(user._id, recoveryCode)
                await this.emailManager.sendConfirmationEmail(recoveryCode, user.accountData.email, passwordRecoveryMessage)
            } catch (e) {
                return true
            }
        }
        return true
    }

    async setNewPasswordByRecoveryCode(newPassword: string, recoveryCode: string): Promise<boolean> {

        const user: UserAccount | null = await this.userRepository.findUserByRecoveryCode(recoveryCode)

        if (!user) return false
        // if (user.emailConfirmation.isConfirmed) return false
        if (user.accountData.recoveryCode !== recoveryCode) return false
        if (user.accountData.recoveryCodeExpiration < new Date()) return false

        const passwordHash = await bcrypt.hash(newPassword, 10)

        return await this.userRepository.updateUserAccountData(user._id, passwordHash)
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

    async findUserById(userId: string): Promise<UserAccount | null> {
        return await this.userRepository.findUserById(userId)
    }

    async getCurrentUser(user: UserAccount): Promise<UserAccountViewType> {

        return {
            email: user.accountData.email,
            login: user.accountData.login,
            userId: user._id.toString(),
        }
    }

    async insertRefreshTokenMetaData(refreshToken: string, ip: string, deviceName: string) {
        const {deviceId, lastActiveDate, userId, expiration} = await this.jwtService.getTokenMetaData(refreshToken)


        const refreshTokenMeta = {
            lastActiveDate: lastActiveDate,
            deviceId: deviceId,
            ip: ip,
            title: deviceName,
            userId: userId,
            expiration: expiration
        }
        await this.tokenInDbRepository.insertRefreshTokenMetaData(refreshTokenMeta)
    }


}



