import {Request, Response, NextFunction} from "express";
import {settings} from "../settings";
import {TokenModel} from "../db/db";
import {RefreshTokenMetaDbType} from "../repositories/types/refresh-token-meta-db-type";
import {JwtService} from "../domain/jwt-service";
import {AuthService} from "../domain/auth-service";


class CheckRefreshTokenMiddleware{

    private jwtService: JwtService
    private authService: AuthService

    constructor() {
        this.jwtService = new JwtService()
        this.authService = new AuthService()
    }


    async use(req: Request, res: Response, next: NextFunction) {

        const refreshToken = req.cookies.refreshToken

        if (!req.cookies.refreshToken) {
            return res.sendStatus(401)
        }

        const refreshTokenMetaData: RefreshTokenMetaDbType = await this.jwtService.getTokenMetaData(refreshToken, settings.REFRESH_TOKEN_SECRET)

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
        req.context.user = await this.authService.findUserById(userId)
        return next()
    }
}

const checkRefreshTokenMiddlewareClass =  new CheckRefreshTokenMiddleware()


export const checkRefreshTokenMiddleware = checkRefreshTokenMiddlewareClass.use.bind(checkRefreshTokenMiddlewareClass)

