import {Request, Response, Router} from "express";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    description,
    nameValidation,  postForBlogValidations, queryValidations,
    websiteUrl
} from "../validations/blog-validations";
import {ObjectId} from "mongodb";
import {BlogsViewType} from "../types/blogs-view-type";
import {blogService} from "../domain/blog-service";
import {blogQueryRepo} from "../query-repositories/blog-query-repo";
import {BlogQueryType} from "../types/blog-query-type";
import {getPaginationValues} from "../functions/pagination-values";
import {PostQueryType} from "../types/post-query-type";
import {postQueryRepo} from "../query-repositories/posts-query-repo";
import {PostsViewType} from "../types/posts-view-type";
import {postService} from "../domain/posts-service";
import {blogIdValidation} from "../validations/post-validations";


export const blogRoutes = Router({})

const createPostValidations = [nameValidation, description, websiteUrl, inputValidationMiddleware]



blogRoutes.get('/', queryValidations, async (req: Request, res: Response) => {
    // const searchName = req.query.searchName | undefined | null
    // const sortBy = req.query.sortBy
    // const sortDirection = req.query.sortDirection
    // const pageNumber = req.query.pageNumber
    // const pageSize = req.query.pageSize

    const {searchName, sortBy, sortDirection, pageNumber, pageSize} = getPaginationValues(req.query)


    const getBlog: BlogQueryType = await blogQueryRepo.getBlog(searchName, sortBy,
        sortDirection, pageNumber, pageSize)

    res.status(200).send(getBlog)
})

blogRoutes.get('/:blogId/posts', queryValidations, async (req: Request, res: Response) => {

    const {pageNumber, pageSize, sortBy, sortDirection} = getPaginationValues(req.query)

    const blogId = req.params.blogId
    const getBlogByBlogId: PostQueryType | boolean = await postQueryRepo.getPostsByBlogId(pageNumber,pageSize, sortBy, sortDirection, blogId)


    if (getBlogByBlogId) {
        res.status(200).send(getBlogByBlogId)
    } else {
        res.send(404)
    }

}) //TODO: is this right blogroutes to be here because request for posts



blogRoutes.post('/', baseAuthorizationMiddleware, createPostValidations,
    async (req: Request, res: Response) => {

        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const newBlog: BlogsViewType = await blogService.createBlog(name, description, websiteUrl)

        if (newBlog) {
            res.status(201).send(newBlog)
        }
    })

blogRoutes.post('/:blogId/posts', baseAuthorizationMiddleware, postForBlogValidations,inputValidationMiddleware,
    async (req: Request, res: Response) => {

            const title = req.body.title
            const shortDescription = req.body.shortDescription;
            const content = req.body.content;
            const blogId = req.params.blogId

            const newPostForBlog: PostsViewType | null= await postService.createPostForBlog (title, shortDescription, content, blogId )

            if (newPostForBlog) {
                res.status(201).send(newPostForBlog)
            } else {
                return res.sendStatus(404)
            }


    })

blogRoutes.get('/:id', async (req: Request, res: Response) => {

    const getBlog: BlogsViewType | boolean = await blogQueryRepo.getBlogById(new ObjectId(req.params.id))

    if (getBlog) {
        res.status(200).send(getBlog)
    } else {
        res.send(404)
    }

})

blogRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidations,
    async (req: Request, res: Response) => {


        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const updateBlog: boolean = await blogService.updateBlog(new ObjectId(req.params.id), name, description, websiteUrl)

        if (updateBlog) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

blogRoutes.delete('/:id', baseAuthorizationMiddleware, async (req: Request, res: Response) => {

    const deleteBlog: boolean = await blogService.deleteBlogById(new ObjectId(req.params.id))

    if (deleteBlog) {
        res.send(204)
    } else {
        res.send(404)
    }

})
