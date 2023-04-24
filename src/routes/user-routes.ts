import {Request, Response, Router} from "express";
import {getPaginationValues} from "../functions/pagination-values";
import {userInputValidations} from "../validations/user-validations";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {checkUserCredentialsMiddleware} from "../middlewares/check-user-credentials-middleware";
import {UserQueryRepo} from "../query-repositories/user-query-repo";
import {UserService} from "../domain/user-service";

export const userRoutes = Router({})

class UserController {

    private userQueryRepo: UserQueryRepo
    private userService: UserService
    constructor() {
        this.userQueryRepo = new UserQueryRepo()
        this.userService = new UserService()
    }

    async getUsers(req: Request, res: Response) {

        const {
            sortBy,
            sortDirection,
            pageNumber,
            pageSize,
            searchLoginTerm,
            searchEmailTerm
        } = getPaginationValues(req.query)

        const getUsers = await this.userQueryRepo.getUsers(sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm)
        res.status(200).send(getUsers)
    }

    async createUser(req: Request, res: Response) {

        const login = req.body.login
        const password = req.body.password
        const email = req.body.email


        const newUser = await this.userService.createNewUser(login, password, email)
        if (newUser) {
            res.status(201).send(newUser)
        }
    }

    async deleteUser(req: Request, res: Response) {

        const id = req.params.id

        const deleteUser = await this.userService.deleteUser(id)

        if (!deleteUser) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }
}

const userController = new UserController()

userRoutes.get("/", baseAuthorizationMiddleware, userController.getUsers.bind(userController))

userRoutes.post("/", baseAuthorizationMiddleware, userInputValidations, checkUserCredentialsMiddleware, inputValidationErrorsMiddleware,
    userController.createUser.bind(userController))

userRoutes.delete("/:id", baseAuthorizationMiddleware, userController.deleteUser.bind(userController))
