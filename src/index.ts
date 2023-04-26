import express from "express";
import {blogRoutes} from "./routes/blog-routes";
import {postRoutes} from "./routes/post-routes";
import { runDb} from "./db/db";
import {deleteRoutes} from "./routes/delete-routes";
import {userRoutes} from "./routes/user-routes";
import {authRoutes} from "./routes/auth-routes";
import {commentRoutes} from "./routes/comment-routes";
import cookieParser from 'cookie-parser';
import {securityRoutes} from "./routes/security-routes";


export const app = express()

app.use(express.json());
app.use(cookieParser());


const port = process.env.PORT || 5000

app.use("/blogs", blogRoutes);
app.use("/posts", postRoutes);
app.use("/testing/all-data", deleteRoutes)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)
app.use("/comments",commentRoutes)
app.use("/security",securityRoutes)
app.set('trust proxy', true)



const startApp = async ()=>
{
    await runDb()

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()

module.exports = app

//
// //exercises
// const user = {
//     age:18,
//     showAge(){
//         console.log(this.age)
//     }
// }
//
// const animal = {
//     age:2,
//     getMyAge:user.showAge
// }
//
// const tap = {
//     age:null
//     getMyAge:user.showAge
// }
//
//
// // const showAge = user.showAge
// // user.showAge()
// //
// // animal.getMyAge
//
// setTimeout(user.showAge.bind(tap),1000)