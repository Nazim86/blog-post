import {Request, Response, Router} from "express";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {authValidations, confirmationCodeValidation, recoveryCodeValidation} from "../validations/auth-validations";
import {jwtService} from "../domain/jwt-service";
import {
    emailValidation,
    newPasswordValidation,
    userInputValidations
} from "../validations/user-validations";
import {authService} from "../domain/auth-service";
import {
    checkUsersAccountsCredentialsMiddleware
} from "../middlewares/check-user-account-credentials-middleware";
import {errorMessage} from "../error-handler/error-handler";
import {settings} from "../settings";
import {checkRefreshTokenMiddleware} from "../middlewares/check-refreshToken-middleware";
import {UserAccountViewType} from "../repositories/types/user-account-view-type";
import {checkIpLimitMiddleware} from "../middlewares/check-ip-limit-middleware";
import {securityService} from "../domain/security-service";
import {clearExpiredTokens} from "../db/db-clearing-expired-tokens";
import {userRepository} from "../repositories/user-in-db-repository";

export const authRoutes = Router({});

class AuthController {

    async userRegistration(req: Request, res: Response) {

        const {login, password, email} = req.body

        const newUser = await authService.createNewUser(login, password, email)

        if (newUser) {
            return res.sendStatus(204)
        }
    }

    async reSendRegistrationEmail(req: Request, res: Response) {

        const email = req.body.email

        const emailResending: string | boolean = await authService.resendEmail(email)

        if (!emailResending) {
            return res.status(400).send(errorMessage("wrong email", "email"))
        }
        res.sendStatus(204)
    }

    async confirmRegistration(req: Request, res: Response) {

        const confirmationCode = req.body.code

        const registrationConfirmation: boolean = await authService.registrationConfirmation(confirmationCode)

        if (!registrationConfirmation) {
            return res.status(400).send(errorMessage("Wrong code", "code"))
        }
        res.sendStatus(204)
    }

    async userLogining(req: Request, res: Response) {

        const {loginOrEmail, password} = req.body;

        const isCredentialsExist = await authService.checkCredentials(loginOrEmail, password)

        if (!isCredentialsExist) {
            return res.sendStatus(401)
        }
        const user = await userRepository.findUserByLoginOrEmail(loginOrEmail)

        if (!user) {
            return res.sendStatus(401)
        }

        const accessToken = await jwtService.createJWT(user._id, settings.ACCESS_TOKEN_SECRET, "10m")
        const refreshToken = await jwtService.createJWT(user._id, settings.REFRESH_TOKEN_SECRET, "20m")

        const ipAddress = req.ip;
        const deviceName = req.headers['user-agent'] ?? "chrome"


        await authService.insertRefreshTokenMetaData(refreshToken, ipAddress!, deviceName!)


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).send({accessToken: accessToken})
    }

    async getNewRefreshToken(req: Request, res: Response) {

        clearExpiredTokens.start();

        const user = req.context.user!

        const {deviceId} = await jwtService.getTokenMetaData(req.cookies.refreshToken, settings.REFRESH_TOKEN_SECRET)

        const accessToken = await jwtService.createJWT(user._id, settings.ACCESS_TOKEN_SECRET, "10m", deviceId)
        const refreshToken = await jwtService.createJWT(user._id, settings.REFRESH_TOKEN_SECRET, "20m", deviceId)

        await securityService.updateDevice(refreshToken)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).send({accessToken: accessToken})
    }

    async getCurrentUser(req: Request, res: Response) {

        const getCurrentUser: UserAccountViewType = await authService.getCurrentUser(req.context.user!)

        res.status(200).send(getCurrentUser)
    }

    async sendPasswordRecoveryCode(req: Request, res: Response) {

        const email = req.body.email


        const isRecoveryEmailSent: boolean = await authService.sendingRecoveryCode(email)

        if (!isRecoveryEmailSent) {
            return res.status(400).send(errorMessage("wrong email", "email"))
        }
        res.sendStatus(204)
    }

    async setNewPassword(req: Request, res: Response) {
        const newPassword = req.body.newPassword
        const recoveryCode = req.body.recoveryCode

        const isNewPasswordSet: boolean = await authService.setNewPasswordByRecoveryCode(newPassword, recoveryCode)

        if (!isNewPasswordSet) {
            return res.status(400).send(errorMessage("Wrong code", "recoveryCode"))
        }
        res.sendStatus(204)
    }

    async logout(req: Request, res: Response) {

        const {
            deviceId,
            userId
        } = await jwtService.getTokenMetaData(req.cookies.refreshToken, settings.REFRESH_TOKEN_SECRET)

        await securityService.deleteDeviceById(deviceId, userId)

        try {
            res.clearCookie("refreshToken")
            res.sendStatus(204)
        } catch (e) {
            res.sendStatus(401)
        }
    }
}

const authController = new AuthController()

authRoutes.post('/registration', checkIpLimitMiddleware, userInputValidations, checkUsersAccountsCredentialsMiddleware, inputValidationErrorsMiddleware,
    authController.userRegistration.bind(authController));

authRoutes.post('/registration-email-resending', checkIpLimitMiddleware, emailValidation, inputValidationErrorsMiddleware,
    authController.reSendRegistrationEmail.bind(authController));

authRoutes.post('/registration-confirmation', checkIpLimitMiddleware, confirmationCodeValidation, inputValidationErrorsMiddleware,
    authController.confirmRegistration.bind(authController));

authRoutes.post('/login', checkIpLimitMiddleware, authValidations, inputValidationErrorsMiddleware,
    authController.userLogining.bind(authController));

authRoutes.post('/refresh-token', checkRefreshTokenMiddleware,
    authController.getNewRefreshToken.bind(authController));

authRoutes.get('/me', checkRefreshTokenMiddleware, authController.getCurrentUser.bind(authController))

authRoutes.post('/password-recovery', checkIpLimitMiddleware, emailValidation, inputValidationErrorsMiddleware,
    authController.sendPasswordRecoveryCode.bind(authController));

authRoutes.post('/new-password', checkIpLimitMiddleware, newPasswordValidation, recoveryCodeValidation, inputValidationErrorsMiddleware,
   authController.setNewPassword.bind(authController));

authRoutes.post('/logout', checkRefreshTokenMiddleware,
    authController.logout.bind(authController));





