import {Request, Response, Router} from "express";
import {blogRepository} from "../repositories/blog-in-db-repository";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {
    description,
    nameValidation, pageNumberValidation, pageSizeValidation,
    searchNameValidation,
    sortByValidation, sortDirectionValidation,
    websiteUrl
} from "../validations/blog-validations";
import {ObjectId} from "mongodb";
import {BlogsViewType} from "../types/blogs-view-type";
import {blogsService} from "../domain/blogs-service";
import {blogQueryRepo} from "../query-repositories/blog-query-repo";
import {BlogQueryType} from "../types/blog-query-type";
import {postQueryRepo} from "../query-repositories/posts-query-repository";

export const blogRoutes = Router({})

const createPostValidations = [nameValidation, description, websiteUrl, inputValidationMiddleware]
const blogQueryValidations = [searchNameValidation, sortByValidation, sortDirectionValidation, pageSizeValidation, pageNumberValidation]

const getPaginationValues = (query: any) => {
    return {
        searchName: query.searchName ?? '',
        sortBy: query.sortBy ?? 'createdAt',
        sortDirection: query.sortDirection ?? 'desc',
        pageNumber: isNaN(+query.pageNumber) ? 1 : +query.pageNumber,
        pageSize: isNaN(+query.pageSize) ? 10 : +query.pageSize,
    }
} // need more explanation

blogRoutes.get('/', blogQueryValidations, async (req: Request, res: Response) => {
    // const searchName = req.query.searchName | undefined | null
    // const sortBy = req.query.sortBy
    // const sortDirection = req.query.sortDirection
    // const pageNumber = req.query.pageNumber
    // const pageSize = req.query.pageSize

    const {searchName, sortBy, sortDirection, pageNumber, pageSize} = getPaginationValues(req.query)

    console.log(pageSize)
    const getBlog: BlogQueryType = await blogQueryRepo.getBlog(searchName, sortBy,
        sortDirection, pageNumber, pageSize)

    res.status(200).send(getBlog)
})

blogRoutes.get('/:id/posts', async (req: Request, res: Response) => {

    const {pageNumber, pageSize, sortBy, sortDirection} = getPaginationValues(req.query)

    const blogId = req.body.blogId

    const getBlogByBlogId = await postQueryRepo.getPostsByBlogId(pageNumber,pageSize, sortBy, sortDirection, blogId)
//----------------------------------------------------------------------------------
    const getBlog: BlogsViewType | boolean = await blogsService.getBlogById(new ObjectId(req.params.id))

    if (getBlog) {
        res.status(200).send(getBlog)
    } else {
        res.send(404)
    }

})

blogRoutes.post('/', baseAuthorizationMiddleware, createPostValidations,
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

    const getBlog: BlogsViewType | boolean = await blogsService.getBlogById(new ObjectId(req.params.id))

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

        const updateBlog: boolean = await blogsService.updateBlog(new ObjectId(req.params.id), name, description, websiteUrl)

        if (updateBlog) {
            res.send(204)
        } else {
            res.send(404)
        }
    })

blogRoutes.delete('/:id', baseAuthorizationMiddleware, async (req: Request, res: Response) => {

    const deleteBlog: boolean = await blogsService.deleteBlogById(new ObjectId(req.params.id))

    if (deleteBlog) {
        res.send(204)
    } else {
        res.send(404)
    }

})
