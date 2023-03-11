import {Request, Response, Router} from "express";
import {blogsCollection, commentsCollection, postsCollection, usersCollection} from "../db/db";


export const deleteRoute = Router({})

deleteRoute.delete('/', async (req: Request, res: Response) => {
    await blogsCollection.deleteMany({})
    await postsCollection.deleteMany({})
    await usersCollection.deleteMany({})
    await commentsCollection.deleteMany({})

    return res.sendStatus(204)
})
