import {Request, Response, Router} from "express";
import {blogsCollection, commentsCollection, postsCollection, usersAcountsCollection, usersCollection} from "../db/db";


export const deleteRoute = Router({})

deleteRoute.delete('/', async (req: Request, res: Response) => {
    await blogsCollection.deleteMany({})
    await postsCollection.deleteMany({})
    await usersCollection.deleteMany({})
    await commentsCollection.deleteMany({})
    await usersAcountsCollection.deleteMany({})

    return res.sendStatus(204)
})
