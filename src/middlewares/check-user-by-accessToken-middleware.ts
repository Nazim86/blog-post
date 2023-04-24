import {Request, Response, NextFunction} from "express";
import {settings} from "../settings";
import {JwtService} from "../domain/jwt-service";
import {AuthService} from "../domain/auth-service";



class CheckUserByAccessTokenMiddlewareController {

    private jwtService: JwtService
    private authService: AuthService
    constructor() {
        this.jwtService = new JwtService()
        this.authService = new AuthService()
    }


    async checkUserByAccessToken(req: Request, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            res.sendStatus(401)
            return
        }

        const accessToken = req.headers.authorization.split(" ")[1]

        const tokenMetaData = await this.jwtService.getTokenMetaData(accessToken, settings.ACCESS_TOKEN_SECRET)

        if (!tokenMetaData || !tokenMetaData.userId) {
            return res.sendStatus(401);
        }

        const {userId} = tokenMetaData;


        req.context = {}
        req.context.user = await this.authService.findUserById(userId)
        next()
    }
}

const checkUserByAccessTokenMiddlewareController =  new CheckUserByAccessTokenMiddlewareController()

export const checkUserByAccessTokenMiddleware = checkUserByAccessTokenMiddlewareController.checkUserByAccessToken.bind(checkUserByAccessTokenMiddlewareController)


//
// export const checkUserByAccessTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//
//     if (!req.headers.authorization) {
//         res.sendStatus(401)
//         return
//     }
//
//     const accessToken = req.headers.authorization.split(" ")[1]
//
//     const tokenMetaData = await jwtService.getTokenMetaData(accessToken, settings.ACCESS_TOKEN_SECRET)
//
//     if (!tokenMetaData || !tokenMetaData.userId) {
//         return res.sendStatus(401);
//     }
//
//     const {userId} = tokenMetaData;
//
//
//     req.context = {}
//     req.context.user = await authService.findUserById(userId)
//     next()
// }