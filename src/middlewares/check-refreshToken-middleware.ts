import {Request, Response, NextFunction} from "express";
import {jwtService} from "../domain/jwt-service";
import {settings} from "../settings";
import {authService} from "../domain/auth-service";

export const checkRefreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.cookies?.refreshToken) {
        res.sendStatus(401)
        return
    }

    const refreshToken = req.cookies.refreshToken

    const userId:string|null = await jwtService.getUserIdByToken(refreshToken,settings.REFRESH_TOKEN_SECRET)

    if (!userId) {
        res.sendStatus(401)
    } else {
        req.context = {}
        req.context.user = await authService.findUserById(userId)
        next()
    }
}