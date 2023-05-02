import {JwtService} from "../application/jwt-service";
import {AuthService} from "../application/auth-service";
import {SecurityService} from "../application/security-service";
import {UserRepository} from "../infrastructure/repositories/user-in-db-repository";
import {Request, Response} from "express";
import {errorMessage} from "../error-handler/error-handler";
import {settings} from "../settings";
import {UserAccountViewType} from "../infrastructure/repositories/types/user-account-view-type";
import {injectable} from "inversify";

@injectable()
export class AuthController {


    constructor(protected jwtService: JwtService,
                protected authService: AuthService,
                protected securityService: SecurityService,
                protected userRepository: UserRepository) {

    }

    async userRegistration(req: Request, res: Response) {

        const {login, password, email} = req.body

        const newUser = await this.authService.createNewUser(login, password, email)

        if (newUser) {
            return res.sendStatus(204)
        }
    }

    async reSendRegistrationEmail(req: Request, res: Response) {

        const email = req.body.email

        const emailResending: string | boolean = await this.authService.resendEmail(email)

        if (!emailResending) {
            return res.status(400).send(errorMessage("wrong email", "email"))
        }
        res.sendStatus(204)
    }

    async confirmRegistration(req: Request, res: Response) {

        const confirmationCode = req.body.code


        const registrationConfirmation: boolean = await this.authService.registrationConfirmation(confirmationCode)

        if (!registrationConfirmation) {
            return res.status(400).send(errorMessage("Wrong code", "code"))
        }
        res.sendStatus(204)
    }

    async userLogining(req: Request, res: Response) {

        const {loginOrEmail, password} = req.body;

        const isCredentialsExist = await this.authService.checkCredentials(loginOrEmail, password)

        if (!isCredentialsExist) {
            return res.sendStatus(401)
        }
        const user = await this.userRepository.findUserByLoginOrEmail(loginOrEmail)

        if (!user) {
            return res.sendStatus(401)
        }

        const accessToken = await this.jwtService.createJWT(user._id, settings.ACCESS_TOKEN_SECRET, "10m")
        const refreshToken = await this.jwtService.createJWT(user._id, settings.REFRESH_TOKEN_SECRET, "20m")

        const ipAddress = req.ip;
        const deviceName = req.headers['user-agent'] ?? "chrome"


        await this.authService.insertRefreshTokenMetaData(refreshToken, ipAddress!, deviceName!)


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).send({accessToken: accessToken})
    }

    async getNewRefreshToken(req: Request, res: Response) {

        const user = req.context.user!

        const {deviceId} = await this.jwtService.getTokenMetaData(req.cookies.refreshToken, settings.REFRESH_TOKEN_SECRET)

        const accessToken = await this.jwtService.createJWT(user._id, settings.ACCESS_TOKEN_SECRET, "10m", deviceId)
        const refreshToken = await this.jwtService.createJWT(user._id, settings.REFRESH_TOKEN_SECRET, "20m", deviceId)

        await this.securityService.updateDevice(refreshToken)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).send({accessToken: accessToken})
    }

    async getCurrentUser(req: Request, res: Response) {

        const getCurrentUser: UserAccountViewType = await this.authService.getCurrentUser(req.context.user!)

        res.status(200).send(getCurrentUser)
    }

    async sendPasswordRecoveryCode(req: Request, res: Response) {

        const email = req.body.email


        const isRecoveryEmailSent: boolean = await this.authService.sendingRecoveryCode(email)

        if (!isRecoveryEmailSent) {
            return res.status(400).send(errorMessage("wrong email", "email"))
        }
        res.sendStatus(204)
    }

    async setNewPassword(req: Request, res: Response) {
        const newPassword = req.body.newPassword
        const recoveryCode = req.body.recoveryCode

        const isNewPasswordSet: boolean = await this.authService.setNewPasswordByRecoveryCode(newPassword, recoveryCode)

        if (!isNewPasswordSet) {
            return res.status(400).send(errorMessage("Wrong code", "recoveryCode"))
        }
        res.sendStatus(204)
    }

    async logout(req: Request, res: Response) {

        const {
            deviceId,
            userId
        } = await this.jwtService.getTokenMetaData(req.cookies.refreshToken, settings.REFRESH_TOKEN_SECRET)

        await this.securityService.deleteDeviceById(deviceId, userId)

        try {
            res.clearCookie("refreshToken")
            res.sendStatus(204)
        } catch (e) {
            res.sendStatus(401)
        }
    }
}