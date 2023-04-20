// import {postForBlogValidations, queryValidations} from "../validations/blog-validations";
// import {Request, Response} from "express";
// import {getPaginationValues} from "../functions/pagination-values";
// import {QueryPaginationType} from "../repositories/types/query-pagination-type";
// import {BlogsViewType} from "../repositories/types/blogs-view-type";
// import {blogQueryRepo} from "../query-repositories/blog-query-repo";
// import {PostsViewType} from "../repositories/types/posts-view-type";
// import {postQueryRepo} from "../query-repositories/posts-query-repo";
// import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
// import {blogService} from "../domain/blog-service";
// import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
// import {postService} from "../domain/posts-service";
// import {blogRoutes} from "./blog-routes";
//
//
// blogRoutes.get('/', queryValidations, async (req: Request, res: Response) => {
//
//     const {searchName, sortBy, sortDirection, pageNumber, pageSize} = getPaginationValues(req.query)
//
//     const getBlog: QueryPaginationType<BlogsViewType[]> = await blogQueryRepo.getBlog(searchName, sortBy,
//         sortDirection, pageNumber, pageSize)
//
//     res.status(200).send(getBlog)
// })
//
// blogRoutes.get('/:blogId/posts', queryValidations, async (req: Request, res: Response) => {
//
//     const {pageNumber, pageSize, sortBy, sortDirection} = getPaginationValues(req.query)
//
//     const blogId = req.params.blogId
//     const getBlogByBlogId: QueryPaginationType<PostsViewType[]> | boolean = await postQueryRepo.getPostsByBlogId(pageNumber, pageSize, sortBy, sortDirection, blogId)
//
//
//     if (getBlogByBlogId) {
//         res.status(200).send(getBlogByBlogId)
//     } else {
//         res.sendStatus(404)
//     }
//
// })
//
//
// blogRoutes.post('/', baseAuthorizationMiddleware, createPostValidations,
//     async (req: Request, res: Response) => {
//
//         const name = req.body.name
//         const description = req.body.description;
//         const websiteUrl = req.body.websiteUrl;
//
//         const newBlog: BlogsViewType = await blogService.createBlog(name, description, websiteUrl)
//
//         if (newBlog) {
//             res.status(201).send(newBlog)
//         }
//     })
//
// blogRoutes.post('/:blogId/posts', baseAuthorizationMiddleware, postForBlogValidations, inputValidationErrorsMiddleware,
//     async (req: Request, res: Response) => {
//
//         const title = req.body.title
//         const shortDescription = req.body.shortDescription;
//         const content = req.body.content;
//         const blogId = req.params.blogId
//
//         const newPostForBlog: PostsViewType | null = await postService.createPostForBlog(title, shortDescription, content, blogId)
//
//         if (newPostForBlog) {
//             res.status(201).send(newPostForBlog)
//         } else {
//             return res.sendStatus(404)
//         }
//
//
//     })
//
// blogRoutes.get('/:id', async (req: Request, res: Response) => {
//
//     const getBlog: BlogsViewType | boolean = await blogQueryRepo.getBlogById(req.params.id)
//
//     if (getBlog) {
//         res.status(200).send(getBlog)
//     } else {
//         res.sendStatus(404)
//     }
//
// })
//
// blogRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidations,
//     async (req: Request, res: Response) => {
//
//
//         const name = req.body.name
//         const description = req.body.description;
//         const websiteUrl = req.body.websiteUrl;
//
//         const updateBlog: boolean = await blogService.updateBlog(req.params.id, name, description, websiteUrl)
//
//         if (updateBlog) {
//             res.sendStatus(204)
//         } else {
//             res.sendStatus(404)
//         }
//
//
//     })
//
// blogRoutes.delete('/:id', baseAuthorizationMiddleware, async (req: Request, res: Response) => {
//
//     const deleteBlog: boolean = await blogService.deleteBlogById(req.params.id)
//
//     if (deleteBlog) {
//         res.sendStatus(204)
//     } else {
//         res.sendStatus(404)
//     }
//
// })