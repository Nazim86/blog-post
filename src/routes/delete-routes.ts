import {Request, Response, Router} from "express";
import {posts} from "../repositories/post-repository";
import {blogs} from "../repositories/blog-repository";

export const deleteRoute = Router({})

deleteRoute.delete('/', (req:Request, res:Response) => {

posts.length = 0
    blogs.length = 0
    res.send(204)

})