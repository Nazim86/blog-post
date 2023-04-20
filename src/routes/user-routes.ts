import {Request, Response, Router} from "express";
import {getPaginationValues} from "../functions/pagination-values";
import {userInputValidations} from "../validations/user-validations";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {userQueryRepo} from "../query-repositories/user-query-repo";
import {checkUserCredentialsMiddleware} from "../middlewares/check-user-credentials-middleware";
import {userService} from "../domain/user-service";

export const userRoutes = Router({})

class UserController {

    async getUsers(req: Request, res: Response) {

        const {
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
            searchLoginTerm,
            searchEmailTerm
        } = getPaginationValues(req.query)

        const getUsers = await userQueryRepo.getUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)

        res.status(200).send(getUsers)
    }

    async createUser(req: Request, res: Response) {

        const login = req.body.login
        const password = req.body.password
        const email = req.body.email


        const newUser = await userService.createNewUser(login, password, email)
        if (newUser) {
            res.status(201).send(newUser)
        }
    }

    async deleteUser(req: Request, res: Response) {

        const id = req.params.id

        const deleteUser = await userService.deleteUser(id)

        if (!deleteUser) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }
}

const userController = new UserController()

userRoutes.get("/", baseAuthorizationMiddleware, userController.getUsers)

userRoutes.post("/", baseAuthorizationMiddleware, userInputValidations, checkUserCredentialsMiddleware, inputValidationErrorsMiddleware,
    userController.createUser)

userRoutes.delete("/:id", baseAuthorizationMiddleware, userController.deleteUser)
