import {Request, Response, NextFunction} from "express";
import {settings} from "../settings";
import {JwtService} from "../application/jwt-service";
import {AuthService} from "../application/auth-service";



export class FindUserByAccessTokenMiddlewareController {

    private jwtService: JwtService
    private authService: AuthService

    constructor() {
        this.jwtService = new JwtService()
        this.authService = new AuthService()
    }

    async findUserByAccessToken(req: Request, res: Response, next: NextFunction) {


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

const findUserByAccessTokenMiddlewareController = new FindUserByAccessTokenMiddlewareController()

export const findUserByAccessTokenMiddleware = findUserByAccessTokenMiddlewareController.findUserByAccessToken.bind(findUserByAccessTokenMiddlewareController)



// export const findUserByAccessTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//
//
//     if (!req.headers.authorization) {
//         res.sendStatus(401)
//         return
//     }
//
//     const accessToken = req.headers.authorization.split(" ")[1]
//
//     const tokenMetaData = await jwtService.getTokenMetaData(accessToken,settings.ACCESS_TOKEN_SECRET)
//
//     if (!tokenMetaData || !tokenMetaData.userId) {
//         return res.sendStatus(401);
//     }
//
//     const { userId } = tokenMetaData;
//
//
//     req.context = {}
//     req.context.user = await authService.findUserById(userId)
//     next()
//
// }