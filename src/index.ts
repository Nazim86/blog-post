import express from "express";
import {blogRoutes} from "./routes/blog-routes";
import {postRoutes} from "./routes/post-routes";
import { runDb} from "./db/db";
import {deleteRoute} from "./routes/delete-routes";
import {userRouter} from "./routes/user-router";
import {authRoutes} from "./routes/auth-routes";
import {commentRouter} from "./routes/comment-router";
import cookieParser from 'cookie-parser';
import {securityRouter} from "./routes/security-routes";


export const app = express()

app.use(express.json());
app.use(cookieParser());


const port = process.env.PORT || 5000

app.use("/blogs", blogRoutes);
app.use("/posts", postRoutes);
app.use("/testing/all-data", deleteRoute)
app.use("/users", userRouter)
app.use("/auth", authRoutes)
app.use("/comments",commentRouter)
app.use("security",securityRouter)


const startApp = async ()=>
{
    await runDb()

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()