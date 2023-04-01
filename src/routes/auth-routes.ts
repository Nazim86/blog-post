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
import {clearExpiredTokens, tokensCollection} from "../db/db";
import {checkUserByAccessTokenMiddleware} from "../middlewares/check-user-by-accessToken-middleware";

export const authRoutes = Router({});

authRoutes.post('/login', authValidations, inputValidationErrorsMiddleware, async (req: Request, res: Response) => {

    const {loginOrEmail, password} = req.body;


    const user = await authService.checkCredentials(loginOrEmail, password)

    if (!user) {
        return res.sendStatus(401)
    }

        const accessToken = await jwtService.createJWT(user._id, settings.ACCESS_TOKEN_SECRET, "1d")
        const refreshToken = await jwtService.createJWT(user._id, settings.REFRESH_TOKEN_SECRET, "2d")

        const ipAddress = req.header('x-forwarded-for');
        const deviceName = req.headers['user-agent']

    console.log(deviceName)
        await authService.insertRefreshTokenMetaData (refreshToken,ipAddress!,deviceName!) //TODO validation of IP address and deviceName

            res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict', //secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).send({accessToken: accessToken})


});

authRoutes.post('/refresh-token', checkRefreshTokenMiddleware,
    async (req: Request, res: Response) => {
        clearExpiredTokens.start();

        const user = req.context.user!


        // const oldRefreshTokenData = jwt.verify(req.cookies.refreshToken, settings.REFRESH_TOKEN_SECRET) //del
        // console.log(oldRefreshTokenData) //del

        const accessToken = await jwtService.createJWT(user._id, settings.ACCESS_TOKEN_SECRET, "1d")
        const refreshToken = await jwtService.createJWT(user._id, settings.REFRESH_TOKEN_SECRET, "2d")

        const ipAddress = req.header('x-forwarded-for');
        const deviceName = req.headers['user-agent'] ?? "chrome";


        await authService.insertRefreshTokenMetaData (refreshToken,ipAddress!,deviceName) //TODO validation of IP address and deviceName


        // console.log(refreshToken)
        //
        // console.log(jwt.verify(refreshToken, settings.REFRESH_TOKEN_SECRET))//del

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict', //secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).send({accessToken: accessToken})

    });

authRoutes.post('/logout', checkRefreshTokenMiddleware,
    async (req: Request, res: Response) => {

    try {
        res.clearCookie("refreshToken")
        res.sendStatus(204)
    } catch (e){
        res.sendStatus(401)
    }


    });


authRoutes.post('/registration', userInputValidations, checkUsersAccountsCredentialsMiddleware, inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const {login, password, email} = req.body


        const newUser = await authService.createNewUser(login, password, email)

        if (newUser) {
            res.sendStatus(204)
        }

    });

authRoutes.post('/registration-confirmation', confirmationCodeValidation, inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const confirmationCode = req.body.code

        const registrationConfirmation: boolean = await authService.registrationConfirmation(confirmationCode)

        if (!registrationConfirmation){
            return res.status(400).send(errorMessage("Wrong code", "code"))
        }

            res.sendStatus(204)

    });


authRoutes.post('/registration-email-resending', emailValidation, inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const email = req.body.email


        const emailResending: string | boolean = await authService.resendEmail(email)

        if (emailResending === true) {
            res.sendStatus(204)
        } else if (emailResending === "Try") { //Limiting user email resending by time
            res.status(400).send("Please try again after 10 seconds")
        } else {
            res.status(400).send(errorMessage("wrong email", "email"))
        }


    });


authRoutes.get('/me', checkUserByAccessTokenMiddleware, async (req: Request, res: Response) => {

    const getCurrentUser: UserAccountViewType = await authService.getCurrentUser(req.context.user!)

    res.status(200).send(getCurrentUser)

})
