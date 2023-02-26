import {Request, Response, Router} from "express";
import {blogsCollection, postsCollection} from "../db/db";


export const deleteRoute = Router({})

deleteRoute.delete('/', async (req: Request, res: Response) => {
    await blogsCollection.deleteMany({})
    await postsCollection.deleteMany({})
    return res.sendStatus(204)
})