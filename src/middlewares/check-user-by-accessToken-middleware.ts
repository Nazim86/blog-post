import {Request, Response, NextFunction} from "express";
import {jwtService} from "../domain/jwt-service";
import {settings} from "../settings";
import {authService} from "../domain/auth-service";

export const checkUserByAccessTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }

    const accessToken = req.headers.authorization.split(" ")[1]

    const tokenMetaData = await jwtService.getRefreshTokenMetaData(accessToken,settings.ACCESS_TOKEN_SECRET)

    if (!tokenMetaData || !tokenMetaData.userId) {
        return res.sendStatus(401);
    }

    const { userId } = tokenMetaData;


        req.context = {}
        req.context.user = await authService.findUserById(userId)
        next()
}