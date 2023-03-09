import {Request, Response, Router} from "express";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {
    blogIdValidation,
    contentValidation,
    descriptionValidation,
    postNameValidation
} from "../validations/post-validations";
import {PostsViewType} from "../types/posts-view-type";
import {postService} from "../domain/posts-service";
import {getPaginationValues} from "../functions/pagination-values";
import {postQueryRepo} from "../query-repositories/posts-query-repo";
import {PostQueryType} from "../types/post-query-type";


export const postRoutes = Router({})


const createPostValidation = [ postNameValidation, descriptionValidation, contentValidation, blogIdValidation, inputValidationErrorsMiddleware] //

postRoutes.get('/', async (req: Request, res: Response) => {

    const {pageNumber,pageSize,sortBy,sortDirection} = getPaginationValues(req.query)

    const getPost:PostQueryType = await postQueryRepo.getPost(pageNumber,pageSize,sortBy,sortDirection);

    res.status(200).send(getPost)
})

postRoutes.post('/', baseAuthorizationMiddleware, createPostValidation,
    async (req: Request, res: Response) => {

        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;


        const newPost:PostsViewType|null = await postService.createPost(title, shortDescription, content, blogId)
        if (newPost) {
            res.status(201).send(newPost)
        }
        else{
            res.sendStatus(404)
        }

    })


postRoutes.get('/:id',  async (req: Request, res: Response) => {

    const getPost:PostsViewType|boolean = await postQueryRepo.getPostById(req.params.id)

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

        const updatePost:boolean = await postService.updatePost(req.params.id, title, shortDescription, content, blogId)

        if (updatePost) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

postRoutes.delete('/:id', baseAuthorizationMiddleware, async (req: Request, res: Response) => {

    const deletePost:boolean = await postService.deletePostById(req.params.id)

    if (deletePost) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})
