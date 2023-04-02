import {Request, Response, Router} from "express";
import {
    blogsCollection,
    commentsCollection,
    postsCollection,
    tokensCollection,
    usersAccountsCollection
} from "../db/db";


export const deleteRoutes = Router({})

deleteRoutes.delete('/', async (req: Request, res: Response) => {
    await blogsCollection.deleteMany({})
    await postsCollection.deleteMany({})
    // await usersCollection.deleteMany({})
    await commentsCollection.deleteMany({})
    await usersAccountsCollection.deleteMany({})
    await tokensCollection.deleteMany({})

    return res.sendStatus(204)
})
