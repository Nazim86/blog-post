import {Request, Response, Router} from "express";
import {
    BlogModel, CommentModel, IpModel, LikeModel, PostModel, TokenModel, UserAccountModel,

} from "../db/db";


export const deleteRoutes = Router({})

class DeleteController {

    async deleteRoutes (req: Request, res: Response){
    await BlogModel.deleteMany({})
    await PostModel.deleteMany({})
    await CommentModel.deleteMany({})
    await UserAccountModel.deleteMany({})
    await TokenModel.deleteMany({})
    await IpModel.deleteMany({})
    await LikeModel.deleteMany({})

    return res.sendStatus(204)
}

}

const deleteController = new DeleteController()

deleteRoutes.delete('/', deleteController.deleteRoutes.bind(deleteController))
