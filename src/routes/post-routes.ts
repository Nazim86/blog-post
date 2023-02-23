import {Request, Response, Router} from "express";
import {postRepository, posts} from "../repositories/post-in-db-repository";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    blogIdValidation,
    contentValidation,
    descriptionValidation,
    postNameValidation
} from "../validations/post-validations";


export const postRoutes = Router({})


const createPostValidation = [ postNameValidation, descriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware] //

postRoutes.get('/', async (req: Request, res: Response) => {
    const getPost = await postRepository.getPost();
    res.status(200).send(getPost)
})

postRoutes.post('/', baseAuthorizationMiddleware, createPostValidation,
    async (req: Request, res: Response) => {

        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;


        const newPost = await postRepository.createPost(title, shortDescription, content, blogId)
        if (newPost) {
            res.status(201).send(newPost)
        }


    })

postRoutes.get('/:id',  (req: Request, res: Response) => {

    const getPost = postRepository.getPostById(req.params.id)

    if (getPost) {
        res.status(200).send(getPost)
    } else {
        res.send(404)
    }

    res.status(200).send(getPost)
})


postRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidation,
    async (req: Request, res: Response) => {


        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const updatePost = await postRepository.updatePost(req.params.id, title, shortDescription, content, blogId)

        if (updatePost) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

postRoutes.delete('/:id', baseAuthorizationMiddleware, async (req: Request, res: Response) => {

    const deletePost = await postRepository.deletePostById(req.params.id)

    if (deletePost) {
        res.send(204)
    } else {
        res.send(404)
    }

})
