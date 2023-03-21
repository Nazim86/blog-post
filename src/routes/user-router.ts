import {Request,Response, Router} from "express";
import {getPaginationValues} from "../functions/pagination-values";
import {userInputValidations} from "../validations/user-validations";
import {userService} from "../domain/user-service";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {userQueryRepo} from "../query-repositories/user-query-repo";
import {checkUserCredentialsMiddleware} from "../middlewares/check-user-credentials-middleware";
import {authService} from "../domain/auth-service";

export const userRouter = Router({})

userRouter.get("/", baseAuthorizationMiddleware,async (req:Request,res:Response)=>{

const {sortBy,sortDirection,pageNumber,pageSize,searchLoginTerm,searchEmailTerm} = getPaginationValues(req.query)

    const getUsers = await userQueryRepo.getUsers (sortBy,sortDirection,pageNumber,pageSize,searchLoginTerm,searchEmailTerm)

       res.status(200).send(getUsers)
})

userRouter.post("/", baseAuthorizationMiddleware,userInputValidations,checkUserCredentialsMiddleware,inputValidationErrorsMiddleware,async (req:Request, res:Response)=>{

const login = req.body.login
    const password = req.body.password
    const email = req.body.email


    const newUser = await authService.createNewUser(login,password,email)
    if (newUser){
        res.status(201).send(newUser)
    }
})

userRouter.delete("/:id", baseAuthorizationMiddleware,async (req:Request,res:Response)=>{

    const id = req.params.id

    const deleteUser = await userService.deleteUser(id)

    if(deleteUser) {

        res.sendStatus(204)
    }else{
        res.sendStatus(404)
    }



})
