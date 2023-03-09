import {Request,Response, Router} from "express";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {authValidations} from "../validations/auth-validations";
import {userService} from "../domain/user-service";
import {jwtService} from "../domain/jwt-service";

export const authRoutes = Router({});

authRoutes.post('/login',authValidations,inputValidationErrorsMiddleware,async (req: Request, res: Response) => {

    const {loginOrEmail, password} = req.body;

    const user = await userService.checkCredentials(loginOrEmail, password)

    if (!user) {
        res.sendStatus(401)

    }else{
        const token = await jwtService.createJWT(user)
        res.status(200).send({accessToken:token})

    }

});

//TODO also fix get here
authRoutes.get('/me', async (req:Request, res: Response)=>{
    const token = req.headers.
    const getCurrentUserInfo = await jwtService.getUserIdByToken(token)
})