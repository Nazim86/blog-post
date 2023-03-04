import {Request,Response, Router} from "express";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {authValidations} from "../validations/auth-validations";
import {userService} from "../domain/user-service";

export const authRoutes = Router({});

authRoutes.post('/',authValidations,inputValidationMiddleware,async (req: Request, res: Response) => {

    const {loginOrEmail, password} = req.body;

    const checkCredentials = await userService.checkCredentials(loginOrEmail, password)

    if (checkCredentials) {

        res.sendStatus(204)

    }else{
        res.sendStatus(401)
    }

});