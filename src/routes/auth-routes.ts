import {Request,Response, Router} from "express";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {authValidations, confirmationCodeValidation} from "../validations/auth-validations";
import {jwtService} from "../domain/jwt-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {userInputValidations} from "../validations/user-validations";
import {authService} from "../domain/auth-service";
import {userService} from "../domain/user-service";
import {checkUserCredentialsMiddleware} from "../middlewares/check-user-account-credentials-middleware";

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

authRoutes.post('/registration',userInputValidations,checkUserCredentialsMiddleware,inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const {login,password,email} = req.body


        const newUser = await authService.createNewUser(login,password,email)
        if (newUser){
            res.status(204).send(newUser)
        }

    });

authRoutes.post('/registration-confirmation',confirmationCodeValidation,inputValidationErrorsMiddleware,
    async (req: Request, res: Response) => {

        const confirmationCode = req.body.code


        const registrationConfirmation = await authService.registrationConfirmation(confirmationCode)

        if (!registrationConfirmation) res.sendStatus(400)

        res.sendStatus(204)
    });


//TODO also fix get here
authRoutes.get('/me', authMiddleware,async (req:Request, res: Response)=>{

    const getCurrentUser = req.context.user

    res.status(200).send(getCurrentUser)

})
