import express, {Request, Response, Router, NextFunction} from "express";
import { body,validationResult } from 'express-validator';import {blogRepository, blogs} from "./repositories/blog-repository";
import bodyParser from "body-parser";
import {blogRoutes} from "./routes/blog-routes";

const app = express()

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

const port = 5000
app.use("/blogs", blogRoutes)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})