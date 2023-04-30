import {Request, Response, NextFunction} from "express";
import {settings} from "../settings";
import {container} from "../composition-root";
import {JwtService} from "../domain/jwt-service";
import {AuthService} from "../domain/auth-service";

const jwtService = container.resolve(JwtService)
const authService = container.resolve(AuthService)

export const  checkUserByAccessTokenMiddleware =  async (req: Request, res: Response, next: NextFunction)=> {

        if (!req.headers.authorization) {
            res.sendStatus(401)
            return
        }

        const accessToken = req.headers.authorization.split(" ")[1]

        const tokenMetaData = await jwtService.getTokenMetaData(accessToken, settings.ACCESS_TOKEN_SECRET)

        if (!tokenMetaData || !tokenMetaData.userId) {
            return res.sendStatus(401);
        }

        const {userId} = tokenMetaData;

        req.context = {}
        req.context.user = await authService.findUserById(userId)
        return next()
    }






