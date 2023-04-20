import {Request, Response, Router} from "express";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {
    description,
    nameValidation, postForBlogValidations, queryValidations,
    websiteUrl
} from "../validations/blog-validations";
import {BlogsViewType} from "../repositories/types/blogs-view-type";
import {blogService} from "../domain/blog-service";
import {blogQueryRepo} from "../query-repositories/blog-query-repo";
import {getPaginationValues} from "../functions/pagination-values";
import {postQueryRepo} from "../query-repositories/posts-query-repo";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {postService} from "../domain/posts-service";
import {QueryPaginationType} from "../repositories/types/query-pagination-type";


export const blogRoutes = Router({})

const createPostValidations = [nameValidation, description, websiteUrl, inputValidationErrorsMiddleware]

class BlogController {
    async getBlogs(req: Request, res: Response) {

        const {searchName, sortBy, sortDirection, pageNumber, pageSize} = getPaginationValues(req.query)

        const getBlog: QueryPaginationType<BlogsViewType[]> = await blogQueryRepo.getBlog(searchName, sortBy,
            sortDirection, pageNumber, pageSize)

        res.status(200).send(getBlog)
    }

    async getPostsByBlogId(req: Request, res: Response) {

        const {pageNumber, pageSize, sortBy, sortDirection} = getPaginationValues(req.query)

        const blogId = req.params.blogId
        const getBlogByBlogId: QueryPaginationType<PostsViewType[]> | boolean = await postQueryRepo.getPostsByBlogId(pageNumber, pageSize, sortBy, sortDirection, blogId)

        if (!getBlogByBlogId) {
            return res.sendStatus(404)
        }
        res.status(200).send(getBlogByBlogId)
    }

    async createBlog(req: Request, res: Response) {

        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const newBlog: BlogsViewType = await blogService.createBlog(name, description, websiteUrl)

        if (newBlog) {
            res.status(201).send(newBlog)
        }
    }

    async createPostByBlogId(req: Request, res: Response) {

        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.params.blogId

        const newPostForBlog: PostsViewType | null = await postService.createPostForBlog(title, shortDescription, content, blogId)

        if (!newPostForBlog) {
            return res.sendStatus(404)
        }

        res.status(201).send(newPostForBlog)
    }


    async getBlogById(req: Request, res: Response) {

        const getBlog: BlogsViewType | boolean = await blogQueryRepo.getBlogById(req.params.id)

        if (!getBlog) {
            return res.sendStatus(404)
        }
        res.status(200).send(getBlog)
    }



    async updateBlog (req: Request, res: Response) {


    const name = req.body.name
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;

    const updateBlog: boolean = await blogService.updateBlog(req.params.id, name, description, websiteUrl)

    if (!updateBlog) {
        return res.sendStatus(404)
    }
        res.sendStatus(204)
}

async deleteBlog (req: Request, res: Response) {

    const deleteBlog: boolean = await blogService.deleteBlogById(req.params.id)

    if (!deleteBlog) {
        return res.sendStatus(404)
    }
        res.sendStatus(204)
}

}

const blogController = new BlogController()


blogRoutes.get('/', queryValidations, blogController.getBlogs);

blogRoutes.get('/:blogId/posts', queryValidations, blogController.getPostsByBlogId);

blogRoutes.post('/', baseAuthorizationMiddleware, createPostValidations,blogController.createBlog);

blogRoutes.post('/:blogId/posts', baseAuthorizationMiddleware, postForBlogValidations, inputValidationErrorsMiddleware,blogController.createPostByBlogId);

blogRoutes.get('/:id', blogController.getBlogById);

blogRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidations, blogController.updateBlog);

blogRoutes.delete('/:id', baseAuthorizationMiddleware, blogController.deleteBlog);
