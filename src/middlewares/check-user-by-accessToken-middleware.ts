import {Request, Response, NextFunction} from "express";
import {jwtService} from "../domain/jwt-service";
import {settings} from "../settings";
import {authService} from "../domain/auth-service";

export const checkUserByAccessTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }

    const token = req.headers.authorization.split(" ")[1]

    const userId = await jwtService.getUserIdByToken(token,settings.ACCESS_TOKEN_SECRET)

    if (!userId) {
        res.sendStatus(401)
    } else {
        req.context = {}
        req.context.user = await authService.findUserById(userId)
        next()
    }



}