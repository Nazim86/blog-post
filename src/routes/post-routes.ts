import {Request, Response, Router} from "express";
import {body, param} from "express-validator";
import {postRepository, posts} from "../repositories/post-repository";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export const postRoutes = Router({})

const nameValidation = body("title").isString().trim().isLength({max:30})
const descriptionValidation = body("shortDescription").isString().trim().isLength({max:100})
const contentValidation = body("content").isString().trim().isLength({max:1000})
const blogIdValidation = body("blogId").isString()
const idValidation = param("id").exists()

postRoutes.get('/', (req:Request, res:Response) => {

    res.status(200).send(posts)
})

postRoutes.post('/',baseAuthorizationMiddleware,nameValidation,descriptionValidation,contentValidation,blogIdValidation,inputValidationMiddleware,
    (req, res) => {

        // const username = req.headers.username
        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const newPost = postRepository.createPost(title, shortDescription, content, blogId)

        if (newPost) {
            res.status(201).send(newPost)
        }
    })

postRoutes.get('/:id',idValidation, (req:Request, res:Response) => {

    const getPost = postRepository.getPostById(+req.params.id)

    if(getPost){
        res.status(200).send(getPost)
    }else{
        res.send(404)
    }

    res.status(200).send(getPost)
})


postRoutes.put('/:id',baseAuthorizationMiddleware,idValidation,nameValidation,descriptionValidation,contentValidation,blogIdValidation,inputValidationMiddleware,
    (req, res) => {


        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const updatePost = postRepository.updatePost(+req.params.id,title, shortDescription, content, blogId)

        if (updatePost) {
            res.send(204)
        }else{
            res.send(404)
        }
    })

postRoutes.delete('/:id',baseAuthorizationMiddleware, (req:Request, res:Response) => {

    const deletePost = postRepository.deletePostById(+req.params.id)

    if (deletePost){
        res.send(204)
    }else{
        res.send(404)
    }

})
