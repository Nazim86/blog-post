import {UserQueryRepo} from "../infrastructure/query-repositories/user-query-repo";
import {UserService} from "../application/user-service";
import {Request, Response} from "express";
import {getPaginationValues} from "../functions/pagination-values";
import {injectable} from "inversify";

@injectable()
export class UserController {

    constructor(protected userQueryRepo: UserQueryRepo,
                protected userService: UserService) {
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