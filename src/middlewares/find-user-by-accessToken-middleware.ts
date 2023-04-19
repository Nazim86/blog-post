import {Request, Response, NextFunction} from "express";
import {jwtService} from "../domain/jwt-service";
import {settings} from "../settings";
import {authService} from "../domain/auth-service";

export const findUserByAccessTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {



    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }

    const accessToken = req.headers.authorization.split(" ")[1]

    const tokenMetaData = await jwtService.getTokenMetaData(accessToken,settings.ACCESS_TOKEN_SECRET)

    if (!tokenMetaData || !tokenMetaData.userId) {
        return res.sendStatus(401);
    }

    const { userId } = tokenMetaData;


    req.context = {}
    req.context.user = await authService.findUserById(userId)
    next()


//     const authorization = req.headers.authorization
// if (authorization) {
//     const accessToken = authorization.split(" ")[1]
//
//     const tokenMetaData = await jwtService.getTokenMetaData(accessToken, settings.ACCESS_TOKEN_SECRET)
//     const {userId} = tokenMetaData
//
//     if (userId) {
//         req.context = {}
//         req.context.user = await authService.findUserById(userId)
//         return next()
//     }else{
//         return next()
//     }
//
// }else{
//     return next()
// }
}