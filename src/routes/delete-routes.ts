import {Request, Response, Router} from "express";
import {
    BlogModel,CommentModel, ipCollection, PostModel,

    tokensCollection, UserAccountModel,

} from "../db/db";


export const deleteRoutes = Router({})

deleteRoutes.delete('/', async (req: Request, res: Response) => {
    await BlogModel.deleteMany({})
    await PostModel.deleteMany({})
    // await usersCollection.deleteMany({})
    await CommentModel.deleteMany({})
    await UserAccountModel.deleteMany({})
    await tokensCollection.deleteMany({})
    await ipCollection.deleteMany({})

    return res.sendStatus(204)
})
