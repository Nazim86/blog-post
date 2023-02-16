import express from "express";
import bodyParser from "body-parser";
import {blogRoutes} from "./routes/blog-routes";
import {postRoutes} from "./routes/post-routes";
// import {deleteRoute} from "./routes/delete-routes";

const app = express()

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

const port = process.env.PORT || 5000

app.use("/blogs", blogRoutes)
app.use("/posts", postRoutes)
app.use("testing/all-data", blogRoutes)
app.use("testing/all-data", postRoutes)





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})