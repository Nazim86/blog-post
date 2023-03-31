import {Request, Response, NextFunction} from "express";
import {jwtService} from "../domain/jwt-service";
import {settings} from "../settings";
import {authService} from "../domain/auth-service";
import {tokensCollection} from "../db/db";

export const checkRefreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken


    if (!req.cookies.refreshToken ) {
        return res.sendStatus(401)

    }

    const {deviceId,issuedAt,userId}:any = await jwtService.getRefreshTokenMetaData(refreshToken,settings.REFRESH_TOKEN_SECRET)


    if (!userId) {
        return res.sendStatus(401)
    }

    const getTokenDataFromDb = await tokensCollection.findOne({deviceId:deviceId,issuedAt:issuedAt})

    if (!getTokenDataFromDb){
        return res.sendStatus(401)
    }

        req.context = {}
        req.context.user = await authService.findUserById(userId)
        next()

}