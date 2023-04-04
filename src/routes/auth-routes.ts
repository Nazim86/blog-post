import {Request, Response, Router} from "express";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {authValidations, confirmationCodeValidation} from "../validations/auth-validations";
import {jwtService} from "../domain/jwt-service";
import {emailValidation, userInputValidations} from "../validations/user-validations";
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

export const authRoutes = Router({});

authRoutes.post('/registration', checkIpLimitMiddleware, userInputValidations, checkUsersAccountsCredentialsMiddleware, inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const {login, password, email} = req.body

        const newUser = await authService.createNewUser(login, password, email)

        if (newUser) {
            res.sendStatus(204)
        }

    });

authRoutes.post('/registration-email-resending', checkIpLimitMiddleware, emailValidation, inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const email = req.body.email


        const emailResending: string | boolean = await authService.resendEmail(email)

        if (!emailResending) {
            return res.status(400).send(errorMessage("wrong email", "email"))
        }

        res.sendStatus(204)

    });

authRoutes.post('/registration-confirmation', checkIpLimitMiddleware, confirmationCodeValidation, inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const confirmationCode = req.body.code

        const registrationConfirmation: boolean = await authService.registrationConfirmation(confirmationCode)

        if (!registrationConfirmation) {
            return res.status(400).send(errorMessage("Wrong code", "code"))
        }
        res.sendStatus(204)
    });


authRoutes.post('/login', checkIpLimitMiddleware, authValidations, inputValidationErrorsMiddleware, async (req: Request, res: Response) => {

    const {loginOrEmail, password} = req.body;


    const user = await authService.checkCredentials(loginOrEmail, password)

    if (!user) {
        return res.sendStatus(401)
    }

    const accessToken = await jwtService.createJWT(user._id, settings.ACCESS_TOKEN_SECRET, "10s")
    const refreshToken = await jwtService.createJWT(user._id, settings.REFRESH_TOKEN_SECRET, "20s")

    const ipAddress = req.ip;
    const deviceName = req.headers['user-agent'] ?? "chrome"

    // console.log(deviceName) del


    await authService.insertRefreshTokenMetaData(refreshToken, ipAddress!, deviceName!)


    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict', secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).send({accessToken: accessToken})


});

authRoutes.post('/refresh-token', checkRefreshTokenMiddleware,
    async (req: Request, res: Response) => {
        clearExpiredTokens.start();

        const user = req.context.user!

        const {deviceId} = await jwtService.getRefreshTokenMetaData(req.cookies.refreshToken,settings.REFRESH_TOKEN_SECRET)

        const accessToken = await jwtService.createJWT(user._id, settings.ACCESS_TOKEN_SECRET, "10s",deviceId)
        const refreshToken = await jwtService.createJWT(user._id, settings.REFRESH_TOKEN_SECRET, "20s",deviceId)

        // const ipAddress = req.ip;
        // const deviceName = req.headers['user-agent'] ?? "chrome";

        await securityService.updateDevice(refreshToken)

        // console.log("newrefreshtoken",refreshToken)
        //
        // console.log("newrefreshtoken",jwt.verify(refreshToken, settings.REFRESH_TOKEN_SECRET))//del

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict', secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).send({accessToken: accessToken})

    });

authRoutes.get('/me', checkRefreshTokenMiddleware, async (req: Request, res: Response) => {

    const getCurrentUser: UserAccountViewType = await authService.getCurrentUser(req.context.user!)

    res.status(200).send(getCurrentUser)

})

authRoutes.post('/logout', checkRefreshTokenMiddleware,
    async (req: Request, res: Response) => {

        try {
            res.clearCookie("refreshToken")
            res.sendStatus(204)
        } catch (e) {
            res.sendStatus(401)
        }

    });





