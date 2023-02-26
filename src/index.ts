import express from "express";
import {blogRoutes} from "./routes/blog-routes";
import {postRoutes} from "./routes/post-routes";
import { runDb} from "./db/db";
import {deleteRoute} from "./routes/delete-routes";

export const app = express()

// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)

app.use(express.json());

const port = process.env.PORT || 5000

app.use("/blogs", blogRoutes);
app.use("/posts", postRoutes);
app.use("/testing/all-data", deleteRoute)



const startApp = async ()=>
{
    await runDb()

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()