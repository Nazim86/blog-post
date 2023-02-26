import express, {Request, Response} from "express";
import {blogRoutes} from "./routes/blog-routes";
import {postRoutes} from "./routes/post-routes";
import {blogsCollection, postsCollection, runDb} from "./db/db";

export const app = express()

// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)

app.use(express.json());

const port = process.env.PORT || 5000

app.use("/blogs", blogRoutes);
app.use("/posts", postRoutes);

app.delete('/testing/all-data', (req: Request, res: Response) => {
blogsCollection.deleteMany({})
    postsCollection.deleteMany({})
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