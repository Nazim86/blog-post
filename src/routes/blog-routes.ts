import {Request, Response, Router} from "express";
import {blogRepository} from "../repositories/blog-in-db-repository";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {description, nameValidation, websiteUrl} from "../validations/blog-validations";
import {ObjectId} from "mongodb";
import {BlogsViewType} from "../types/blogs-view-type";

export const blogRoutes = Router({})

const createPostValidations= [nameValidation,description,websiteUrl, inputValidationMiddleware]

blogRoutes.get('/', async (req: Request, res: Response) => {

    const getBlog: BlogsViewType[] = await blogRepository.getBlog()

    res.status(200).send(getBlog)
})

blogRoutes.post('/',baseAuthorizationMiddleware,createPostValidations,
    async (req: Request, res: Response) => {

        // const username = req.headers.username
        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const newBlog: BlogsViewType = await blogRepository.createBlog(name, description, websiteUrl)

        if (newBlog) {
            res.status(201).send(newBlog)
        }
    })

blogRoutes.get('/:id', async (req: Request, res: Response) => {

    const getBlog : BlogsViewType |boolean= await blogRepository.getBlogById(new ObjectId(req.params.id))

    if (getBlog) {
        res.status(200).send(getBlog)
    } else {
        res.send(404)
    }

})

blogRoutes.put('/:id',baseAuthorizationMiddleware,createPostValidations,
    async (req: Request, res: Response) => {


        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const updateBlog: boolean = await blogRepository.updateBlog(req.params.id, name, description, websiteUrl)

        if (updateBlog) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

blogRoutes.delete('/:id',baseAuthorizationMiddleware, async (req: Request, res: Response) => {

    const deleteBlog: boolean = await blogRepository.deleteBlogById(req.params.id)

    if (deleteBlog) {
        res.send(204)
    } else {
        res.send(404)
    }

})
