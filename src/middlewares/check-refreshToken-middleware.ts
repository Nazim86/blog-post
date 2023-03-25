import {Request, Response, NextFunction} from "express";
import {jwtService} from "../domain/jwt-service";
import {settings} from "../settings";
import {authService} from "../domain/auth-service";
import {tokensCollection} from "../db/db";

export const checkRefreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken

    const expiredTokens = await tokensCollection.findOne({refreshToken:refreshToken})

    if (!req.cookies.refreshToken || expiredTokens ) {
        res.sendStatus(401)
        return
    }



    const userId:string|null = await jwtService.getUserIdByToken(refreshToken,settings.REFRESH_TOKEN_SECRET)

    if (!userId) {
        res.sendStatus(401)
    } else {
        req.context = {}
        req.context.user = await authService.findUserById(userId)
        next()
    }
}