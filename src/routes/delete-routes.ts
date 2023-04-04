import {Request, Response, Router} from "express";
import {
    blogsCollection,
    commentsCollection, ipCollection,
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
    await ipCollection.deleteMany({})

    return res.sendStatus(204)
})
