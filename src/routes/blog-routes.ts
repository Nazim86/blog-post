import {Request, Response, Router} from "express";
import {blogRepository} from "../repositories/blog-in-db-repository";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {description, nameValidation, websiteUrl} from "../validations/blog-validations";
import {ObjectId} from "mongodb";
import {BlogsViewType} from "../types/blogs-view-type";
import {blogsService} from "../domain/blogs-service";
import {blogQueryRepo} from "../query-repositories/blog-query-repo";
import {BlogQueryType} from "../types/blog-query-type";

export const blogRoutes = Router({})

const createPostValidations= [nameValidation,description,websiteUrl, inputValidationMiddleware]

blogRoutes.get('/', async (req: Request, res: Response) => {

    const searchName = req.query.searchName
    const sortBy  = req.query.sortBy
    const sortDirection = req.query.sortDirection
    const pageNumber = req.query.pageNumber
    const pageSize = req.query.pageSize

    const getBlog: BlogQueryType = await blogQueryRepo.getBlog(searchName,sortBy?,
        sortDirection?,pageNumber?,pageSize?)

    res.status(200).send(getBlog)
})

blogRoutes.post('/',baseAuthorizationMiddleware,createPostValidations,
    async (req: Request, res: Response) => {

        // const username = req.headers.username
        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const newBlog: BlogsViewType = await blogsService.createBlog(name, description, websiteUrl)

        if (newBlog) {
            res.status(201).send(newBlog)
        }
    })

blogRoutes.get('/:id', async (req: Request, res: Response) => {

    const getBlog : BlogsViewType |boolean= await blogsService.getBlogById(new ObjectId(req.params.id))

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

        const updateBlog: boolean = await blogsService.updateBlog(new ObjectId(req.params.id), name, description, websiteUrl)

        if (updateBlog) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

blogRoutes.delete('/:id',baseAuthorizationMiddleware, async (req: Request, res: Response) => {

    const deleteBlog: boolean = await blogsService.deleteBlogById(new ObjectId(req.params.id))

    if (deleteBlog) {
        res.send(204)
    } else {
        res.send(404)
    }

})
