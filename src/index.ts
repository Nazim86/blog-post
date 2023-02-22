import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {blogRoutes} from "./routes/blog-routes";
import {postRoutes} from "./routes/post-routes";
import {posts} from "./repositories/post-in-memory-repository";
import {blogs} from "./repositories/blog-in-memory-repository";
import {runDb} from "./repositories/db";
// import {deleteRoute} from "./routes/delete-routes";

const app = express()

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

const port = process.env.PORT || 5000

app.use("/blogs", blogRoutes)
app.use("/posts", postRoutes)

app.delete('/testing/all-data', (req: Request, res: Response) => {
    posts.length = 0
    blogs.length = 0
    return res.sendStatus(204)
})


const startApp = async ()=>
{
    await runDb()

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()