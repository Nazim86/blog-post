import {Request, Response, Router} from "express";
import {
    BlogModel, CommentModel, ipCollection, PostModel, TokenModel, UserAccountModel,

} from "../db/db";


export const deleteRoutes = Router({})

deleteRoutes.delete('/', async (req: Request, res: Response) => {
    await BlogModel.deleteMany({})
    await PostModel.deleteMany({})
    await CommentModel.deleteMany({})
    await UserAccountModel.deleteMany({})
    await TokenModel.deleteMany({})
    await ipCollection.deleteMany({})

    return res.sendStatus(204)
})
