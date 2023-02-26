import {Request, Response, Router} from "express";
import {blogsCollection, postsCollection} from "../db/db";


export const deleteRoute = Router({})

deleteRoute.delete('/', (req: Request, res: Response) => {
    blogsCollection.deleteMany({})
    postsCollection.deleteMany({})
    return res.sendStatus(204)
})