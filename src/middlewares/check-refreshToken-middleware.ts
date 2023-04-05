import {Request, Response, NextFunction} from "express";
import {jwtService} from "../domain/jwt-service";
import {settings} from "../settings";
import {authService} from "../domain/auth-service";
import {tokensCollection} from "../db/db";
let x=1

export const checkRefreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // console.log(`refreshTokenFromMiddleware ${x++}`)
    const refreshToken = req.cookies.refreshToken

    // console.log(`refreshTokenFromMiddleware ${x++} `,refreshToken)
    if (!req.cookies.refreshToken ) {

        return res.sendStatus(401)


    }

    const refreshTokenMetaData:any = await jwtService.getRefreshTokenMetaData(refreshToken,settings.REFRESH_TOKEN_SECRET) //TODO replace any

    if (!refreshTokenMetaData) {
        return res.sendStatus(401)
    }

    const {deviceId,lastActiveDate,userId} = refreshTokenMetaData

    const getTokenDataFromDb = await tokensCollection.findOne({deviceId:deviceId,lastActiveDate:lastActiveDate})

    if (!getTokenDataFromDb){
        // console.log(`refreshTokenFromMiddleware ${x++}`)
        return res.sendStatus(401)

    }
        req.context = {}
        req.context.user = await authService.findUserById(userId)
        next()

}