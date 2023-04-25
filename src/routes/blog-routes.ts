import {Request, Response, Router} from "express";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {
    description,
    nameValidation, postForBlogValidations, queryValidations,
    websiteUrl
} from "../validations/blog-validations";
import {BlogsViewType} from "../repositories/types/blogs-view-type";
import {BlogService} from "../domain/blog-service";
import {BlogQueryRepo} from "../query-repositories/blog-query-repo";
import {getPaginationValues} from "../functions/pagination-values";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {QueryPaginationType} from "../repositories/types/query-pagination-type";
import {PostsQueryRepo} from "../query-repositories/posts-query-repo";
import {PostsService} from "../domain/posts-service";
import {settings} from "../settings";
import {JwtService} from "../domain/jwt-service";


export const blogRoutes = Router({})

const createPostValidations = [nameValidation, description, websiteUrl, inputValidationErrorsMiddleware]

class BlogController {

    private blogService:BlogService
    private blogQueryRepo:BlogQueryRepo
    private postQueryRepo:PostsQueryRepo
    private postService:PostsService
    private jwtService:JwtService

    constructor() {
        this.blogService = new BlogService()
        this.blogQueryRepo = new BlogQueryRepo()
        this.postQueryRepo = new PostsQueryRepo()
        this.postService = new PostsService()
        this.jwtService = new JwtService()
    }

    async getBlogs(req: Request, res: Response) {

        const {searchName, sortBy, sortDirection, pageNumber, pageSize} = getPaginationValues(req.query)

        const getBlog: QueryPaginationType<BlogsViewType[]> = await this.blogQueryRepo.getBlog(searchName, sortBy,
            sortDirection, pageNumber, pageSize)

        res.status(200).send(getBlog)
    }

    async getPostsByBlogId(req: Request, res: Response) {

        const accessToken: string | undefined = req.headers.authorization?.split(" ")[1]

        let userId = undefined

        if (accessToken) {
            const tokenData = await this.jwtService.getTokenMetaData(accessToken, settings.ACCESS_TOKEN_SECRET)
            if (tokenData) {
                userId = tokenData.userId
            }
        }

        const {pageNumber, pageSize, sortBy, sortDirection} = getPaginationValues(req.query)

        const blogId = req.params.blogId
        const getBlogByBlogId: QueryPaginationType<PostsViewType[]> | boolean = await this.postQueryRepo.getPostsByBlogId(pageNumber, pageSize, sortBy, sortDirection, blogId,userId)

        if (!getBlogByBlogId) {
            return res.sendStatus(404)
        }
        res.status(200).send(getBlogByBlogId)
    }

    async createBlog(req: Request, res: Response) {

        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const newBlog: BlogsViewType = await this.blogService.createBlog(name, description, websiteUrl)

        if (newBlog) {
            res.status(201).send(newBlog)
        }
    }

    async createPostByBlogId(req: Request, res: Response) {

        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.params.blogId

        const newPostForBlog: PostsViewType | null = await this.postService.createPostForBlog(title, shortDescription, content, blogId)

        if (!newPostForBlog) {
            return res.sendStatus(404)
        }

        res.status(201).send(newPostForBlog)
    }


    async getBlogById(req: Request, res: Response) {

        const getBlog: BlogsViewType | boolean = await this.blogQueryRepo.getBlogById(req.params.id)

        if (!getBlog) {
            return res.sendStatus(404)
        }
        res.status(200).send(getBlog)
    }



    async updateBlog (req: Request, res: Response) {


    const name = req.body.name
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;

    const updateBlog: boolean = await this.blogService.updateBlog(req.params.id, name, description, websiteUrl)

    if (!updateBlog) {
        return res.sendStatus(404)
    }
        res.sendStatus(204)
}

async deleteBlog (req: Request, res: Response) {

    const deleteBlog: boolean = await this.blogService.deleteBlogById(req.params.id)

    if (!deleteBlog) {
        return res.sendStatus(404)
    }
        res.sendStatus(204)
}

}

const blogController = new BlogController()


blogRoutes.get('/', queryValidations, blogController.getBlogs.bind(blogController));

blogRoutes.get('/:blogId/posts', queryValidations, blogController.getPostsByBlogId.bind(blogController));

blogRoutes.post('/', baseAuthorizationMiddleware, createPostValidations,blogController.createBlog.bind(blogController));

blogRoutes.post('/:blogId/posts', baseAuthorizationMiddleware, postForBlogValidations, inputValidationErrorsMiddleware,blogController.createPostByBlogId.bind(blogController));

blogRoutes.get('/:id', blogController.getBlogById.bind(blogController));

blogRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidations, blogController.updateBlog.bind(blogController));

blogRoutes.delete('/:id', baseAuthorizationMiddleware, blogController.deleteBlog.bind(blogController));
