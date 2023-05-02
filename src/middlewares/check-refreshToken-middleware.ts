import {Request, Response, NextFunction} from "express";
import {settings} from "../settings";
import {TokenModel} from "../db/db";
import {RefreshTokenMetaDbType} from "../infrastructure/repositories/types/refresh-token-meta-db-type";
import {AuthService} from "../application/auth-service";
import {container} from "../composition-root";
import {JwtService} from "../application/jwt-service";

const jwtService = container.resolve(JwtService)
const authService = container.resolve(AuthService)


export const checkRefreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction)=> {

        const refreshToken = req.cookies.refreshToken

        if (!req.cookies.refreshToken) {
            return res.sendStatus(401)
        }

        const refreshTokenMetaData: RefreshTokenMetaDbType = await jwtService.getTokenMetaData(refreshToken, settings.REFRESH_TOKEN_SECRET)

        if (!refreshTokenMetaData) {
            return res.sendStatus(401)
        }

        const {deviceId, lastActiveDate, userId} = refreshTokenMetaData

        const getTokenDataFromDb = await TokenModel.findOne({deviceId: deviceId, lastActiveDate: lastActiveDate})

        if (!getTokenDataFromDb) {
            // console.log(`refreshTokenFromMiddleware ${x++}`)
            return res.sendStatus(401)
        }
        req.context = {}
        req.context.user = await authService.findUserById(userId)
        return next()
    }

