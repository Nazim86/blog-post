import {BlogQueryRepo} from "../infrastructure/query-repositories/blog-query-repo";
import {JwtService} from "../application/jwt-service";
import {BlogService} from "../application/blog-service";
import {PostsQueryRepo} from "../infrastructure/query-repositories/posts-query-repo";
import {PostService} from "../application/post-service";
import {Request, Response} from "express";
import {getPaginationValues} from "../functions/pagination-values";
import {QueryPaginationType} from "../infrastructure/repositories/types/query-pagination-type";
import {BlogsViewType} from "../infrastructure/repositories/types/blogs-view-type";
import {settings} from "../settings";
import {PostsViewType} from "../infrastructure/repositories/types/posts-view-type";
import {injectable} from "inversify";

@injectable()
export class BlogController {
    constructor(protected blogQueryRepo: BlogQueryRepo,
                protected jwtService: JwtService,
                protected blogService: BlogService,
                protected postQueryRepo: PostsQueryRepo,
                protected postService: PostService) {
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
        const getBlogByBlogId: QueryPaginationType<PostsViewType[]> | boolean = await this.postQueryRepo.getPostsByBlogId(pageNumber, pageSize, sortBy, sortDirection, blogId, userId)

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


    async updateBlog(req: Request, res: Response) {


        const name = req.body.name
        const description = req.body.description;
        const websiteUrl = req.body.websiteUrl;

        const updateBlog: boolean = await this.blogService.updateBlog(req.params.id, name, description, websiteUrl)

        if (!updateBlog) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }

    async deleteBlog(req: Request, res: Response) {

        const deleteBlog: boolean = await this.blogService.deleteBlogById(req.params.id)

        if (!deleteBlog) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }

}