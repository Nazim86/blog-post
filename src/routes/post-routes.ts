import {Request, Response, Router} from "express";
import {baseAuthorizationMiddleware} from "../middlewares/base-auth-middlewares";
import {inputValidationErrorsMiddleware} from "../middlewares/input-validation-errors-middleware";
import {
    blogIdValidation,
    contentValidation,
    descriptionValidation, postCommentContentValidation,
    postNameValidation
} from "../validations/post-validations";
import {PostsViewType} from "../repositories/types/posts-view-type";
import {postService} from "../domain/posts-service";
import {getPaginationValues} from "../functions/pagination-values";
import {postQueryRepo} from "../query-repositories/posts-query-repo";
import {checkUserByAccessTokenMiddleware} from "../middlewares/check-user-by-accessToken-middleware";
import {commentService} from "../domain/comment-service";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {commentsQueryRepo} from "../query-repositories/comments-query-repo";
import {QueryPaginationType} from "../repositories/types/query-pagination-type";


export const postRoutes = Router({})


const createPostValidation = [postNameValidation, descriptionValidation, contentValidation, blogIdValidation, inputValidationErrorsMiddleware] //

class PostController {
    async getPosts(req: Request, res: Response) {

        const {pageNumber, pageSize, sortBy, sortDirection} = getPaginationValues(req.query)

        const getPost: QueryPaginationType<PostsViewType[]> = await postQueryRepo.getPost(pageNumber, pageSize, sortBy, sortDirection);

        res.status(200).send(getPost)
    }

    async getPostById(req: Request, res: Response) {

        const getPost:PostsViewType|boolean = await postQueryRepo.getPostById(req.params.id)

        if (!getPost) {
           return res.sendStatus(404)
        }
            res.status(200).send(getPost)
    }

    async getCommentByPostId(req: Request, res: Response) {

        const {pageNumber, pageSize, sortBy, sortDirection} = getPaginationValues(req.query)

        const getCommentsForPost: QueryPaginationType<CommentsViewType[]> | null =
            await commentsQueryRepo.getCommentsForPost(req.params.postId, pageNumber, pageSize, sortBy, sortDirection)

        if (!getCommentsForPost) {
            return res.sendStatus(404)
        }
        res.status(200).send(getCommentsForPost)
    }

    async createPost(req: Request, res: Response) {

        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const newPost: PostsViewType | null = await postService.createPost(title, shortDescription, content, blogId)
        if (!newPost) {
            return res.sendStatus(404)
        }
        res.status(201).send(newPost)
    }

    async createCommentByPostId(req: Request, res: Response) {

        const postId = req.params.postId
        const content = req.body.content
        const userId = req.context.user!._id.toString()
        const userLogin = req.context.user!.accountData.login

        const postComment: CommentsViewType | null = await commentService.createPostComment(postId, content, userId, userLogin)

        if (!postComment) {
            return res.sendStatus(404)
        }
        res.status(201).send(postComment)
    }

    async updatePost(req: Request, res: Response) {
        const title = req.body.title
        const shortDescription = req.body.shortDescription;
        const content = req.body.content;
        const blogId = req.body.blogId;

        const updatePost: boolean = await postService.updatePost(req.params.id, title, shortDescription, content, blogId)

        if (!updatePost) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }

    async deletePost(req: Request, res: Response) {

        const deletePost: boolean = await postService.deletePostById(req.params.id)

        if (!deletePost) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }

}

const postController = new PostController()

postRoutes.get('/', postController.getPosts)

postRoutes.get('/:id', postController.getPostById)


postRoutes.get('/:postId/comments', postController.getCommentByPostId)

postRoutes.post('/', baseAuthorizationMiddleware, createPostValidation,
    postController.createPost)

postRoutes.post('/:postId/comments', checkUserByAccessTokenMiddleware, postCommentContentValidation, inputValidationErrorsMiddleware,
    postController.createCommentByPostId)


postRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidation,
    postController.updatePost)

postRoutes.delete('/:id', baseAuthorizationMiddleware, postController.deletePost)
