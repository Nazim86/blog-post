import {Request, Response, Router} from "express";
import {postRepository} from "../repositories/post-in-db-repository";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    blogIdValidation,
    contentValidation,
    descriptionValidation,
    postNameValidation
} from "../validations/post-validations";
import {ObjectId} from "mongodb";
import {PostsViewType} from "../types/posts-view-type";


export const postRoutes = Router({})


const createPostValidation = [ postNameValidation, descriptionValidation, contentValidation, blogIdValidation, inputValidationMiddleware] //

postRoutes.get('/', async (req: Request, res: Response) => {
    const getPost: PostsViewType[] = await postRepository.getPost();
    res.status(200).send(getPost)
})

postRoutes.post('/', baseAuthorizationMiddleware, createPostValidation,
    async (req: Request, res: Response) => {

        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;


        const newPost:PostsViewType = await postRepository.createPost(title, shortDescription, content, blogId)
        if (newPost) {
            res.status(201).send(newPost)
        }
        else{
            res.sendStatus(404)
        }

    })

postRoutes.get('/:id',  async (req: Request, res: Response) => {

    const getPost:PostsViewType|boolean = await postRepository.getPostById(new ObjectId(req.params.id))

    if (getPost) {
        res.status(200).send(getPost)
    } else {
        res.send(404)
    }

})


postRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidation,
    async (req: Request, res: Response) => {


        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const updatePost:boolean = await postRepository.updatePost(new ObjectId(req.params.id), title, shortDescription, content, blogId)

        if (updatePost) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

postRoutes.delete('/:id', baseAuthorizationMiddleware, async (req: Request, res: Response) => {

    const deletePost:boolean = await postRepository.deletePostById(new ObjectId(req.params.id))

    if (deletePost) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})
