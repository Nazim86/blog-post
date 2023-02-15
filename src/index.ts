import express, {Request, Response, Router, NextFunction} from "express";
import { body,validationResult } from 'express-validator';import {blogRepository, blogs} from "./repositories/blog-repository";
import bodyParser from "body-parser";
import {blogRoutes} from "./routes/blog-routes";

const app = express()

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

const port = 5000
app.use("/blogs", blogRoutes)



// let blablaMiddleware = (req: Request, res: Response, next: NextFunction)=>{
//     // @ts-ignore
//     req.blabla = "Nazimito";
//     next();
// }
//
// let authGuard = (req: Request, res: Response, next: NextFunction)=>{
//     if (req.query.token === "123"){
//         next();
//     }
//     else {
//         res.send(401)
//     }
// }
//
// let counter = 0;
//
// let countRequest = (req: Request, res: Response, next: NextFunction)=>{
//     counter++;
//     next()
// }
//
// app.use(authGuard)
// app.use(blablaMiddleware)
// app.use(countRequest)
//
//
// app.get('/products', (req, res) => {
//
//     // @ts-ignore
//     const  blabla = req.blabla;
//     res.send({value: blabla +" "+ counter})
// })
//
// app.get('/users', (req, res) => {
//
//     // @ts-ignore
//     const  blabla = req.blabla;
//     res.send({value: blabla +" "+ counter})
// })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})