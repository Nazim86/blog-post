import {Request, Response, NextFunction} from "express";
import {jwtService} from "../domain/jwt-service";
import {settings} from "../settings";
import {authService} from "../domain/auth-service";
import {TokenModel} from "../db/db";
import {RefreshTokenMetaDbType} from "../repositories/types/refresh-token-meta-db-type";

export const checkRefreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken

    if (!req.cookies.refreshToken ) {
        return res.sendStatus(401)
    }

    const refreshTokenMetaData: RefreshTokenMetaDbType = await jwtService.getTokenMetaData(refreshToken,settings.REFRESH_TOKEN_SECRET)

    if (!refreshTokenMetaData) {
        return res.sendStatus(401)
    }

    const {deviceId,lastActiveDate,userId} = refreshTokenMetaData

    const getTokenDataFromDb = await TokenModel.findOne({deviceId:deviceId,lastActiveDate:lastActiveDate})

    if (!getTokenDataFromDb){
        // console.log(`refreshTokenFromMiddleware ${x++}`)
        return res.sendStatus(401)

    }
        req.context = {}
        req.context.user = await authService.findUserById(userId)
        next()

}