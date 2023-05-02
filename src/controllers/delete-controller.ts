import {Request, Response} from "express";
import {BlogModel, CommentModel, IpModel, LikeModel, PostModel, TokenModel} from "../db/db";
import {injectable} from "inversify";
import {UserModel} from "../domain/UsersEntity";

@injectable()
export class DeleteController {

    async deleteRoutes (req: Request, res: Response){
        await BlogModel.deleteMany({})
        await PostModel.deleteMany({})
        await CommentModel.deleteMany({})
        await UserModel.deleteMany({})
        await TokenModel.deleteMany({})
        await IpModel.deleteMany({})
        await LikeModel.deleteMany({})

        return res.sendStatus(204)
    }

}