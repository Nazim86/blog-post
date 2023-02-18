import {Request, Response, Router} from "express";
import {body, param} from "express-validator";
import {postRepository, posts} from "../repositories/post-repository";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {blogs} from "../repositories/blog-repository";

export const postRoutes = Router({})

const nameValidation = body("title").isString().trim().notEmpty().isLength({max:30})
const descriptionValidation = body("shortDescription").isString().trim().notEmpty().isLength({max:100})
const contentValidation = body("content").isString().trim().notEmpty().isLength({max:1000})
const idValidation = param("id").exists()
export const blogIdValidation = body("blogId").isString().trim().notEmpty()
// custom((value, { req }) => {
//     if (value !== req.body.blogId) {
//         throw new Error('Password confirmation does not match password');
//     }
//
//     // Indicates the success of this synchronous custom validator
//     return true;
// })

// custom((blogs, { req }) => {
//
//        if (checkBlogsId(req.body.blogId)){
//            return true;
//        }else{
//            throw new Error("Invalid ID")
//        }
//     // Indicates the success of this synchronous custom validator
//
// })



postRoutes.get('/', (req:Request, res:Response) => {
    res.status(200).send(posts)
})

postRoutes.post('/',baseAuthorizationMiddleware,blogIdValidation,nameValidation,descriptionValidation,contentValidation,inputValidationMiddleware,
    (req, res) => {

        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const findBlogId = blogs.find(p=>p.id === blogId)

        console.log(findBlogId)
        const errMessage =
        {
            "errorsMessages": [
            {
                "message": "Blog Id not foung",
                "field": "blogId"
            }
        ]
        }



        if(findBlogId){
            const newPost = postRepository.createPost(title, shortDescription, content, blogId)
            if (newPost) {
                res.status(201).send(newPost)
            }
        } else{
            res.send(errMessage)
        }

    })

postRoutes.get('/:id',idValidation, (req:Request, res:Response) => {

    const getPost = postRepository.getPostById(req.params.id)

    if(getPost){
        res.status(200).send(getPost)
    }else{
        res.send(404)
    }

    res.status(200).send(getPost)
})


postRoutes.put('/:id',baseAuthorizationMiddleware,idValidation,blogIdValidation,nameValidation,descriptionValidation,contentValidation,inputValidationMiddleware,
    (req, res) => {


        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const updatePost = postRepository.updatePost(req.params.id,title, shortDescription, content, blogId)

        if (updatePost) {
            res.send(204)
        }else{
            res.send(404)
        }
    })

postRoutes.delete('/:id',baseAuthorizationMiddleware, (req:Request, res:Response) => {

    const deletePost = postRepository.deletePostById(req.params.id)

    if (deletePost){
        res.send(204)
    }else{
        res.send(404)
    }

})
