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
import {getPaginationValues} from "../functions/pagination-values";
import {checkUserByAccessTokenMiddleware} from "../middlewares/check-user-by-accessToken-middleware";
import {CommentService} from "../domain/comment-service";
import {CommentsViewType} from "../repositories/types/comments-view-type";
import {QueryPaginationType} from "../repositories/types/query-pagination-type";
import {PostsQueryRepo} from "../query-repositories/posts-query-repo";
import {CommentsQueryRepo} from "../query-repositories/comments-query-repo";
import {PostsService} from "../domain/posts-service";
import {likeValidation} from "../validations/like-validation";
import {settings} from "../settings";
import {JwtService} from "../domain/jwt-service";


export const postRoutes = Router({})


const createPostValidation = [postNameValidation, descriptionValidation, contentValidation, blogIdValidation, inputValidationErrorsMiddleware] //

class PostController {

    private postQueryRepo: PostsQueryRepo
    private commentsQueryRepo: CommentsQueryRepo
    private postService: PostsService
    private commentService: CommentService
    private jwtService:JwtService

    constructor() {
        this.postQueryRepo = new PostsQueryRepo()
        this.commentsQueryRepo = new CommentsQueryRepo()
        this.postService = new PostsService()
        this.commentService = new CommentService()
        this.jwtService = new JwtService()
    }

    async getPosts(req: Request, res: Response) {

        const accessToken: string | undefined = req.headers.authorization?.split(" ")[1]

        let userId = undefined

        if (accessToken) {
            const tokenData = await this.jwtService.getTokenMetaData(accessToken, settings.ACCESS_TOKEN_SECRET)
            if (tokenData) {
                userId = tokenData.userId
            }
        }

        const {pageNumber, pageSize, sortBy, sortDirection} = getPaginationValues(req.query)

        const getPost: QueryPaginationType<PostsViewType[]> = await this.postQueryRepo.getPost(pageNumber, pageSize, sortBy, sortDirection,userId);

        res.status(200).send(getPost)
    }

    async getPostById(req: Request, res: Response) {

        const accessToken: string | undefined = req.headers.authorization?.split(" ")[1]

        let userId = undefined

        if (accessToken) {
            const tokenData = await this.jwtService.getTokenMetaData(accessToken, settings.ACCESS_TOKEN_SECRET)
            if (tokenData) {
                userId = tokenData.userId
            }
        }

        const getPost: PostsViewType | boolean = await this.postQueryRepo.getPostById(req.params.id,userId)

        if (!getPost) {
            return res.sendStatus(404)
        }
        res.status(200).send(getPost)
    }

    async getCommentByPostId(req: Request, res: Response) {

        const {pageNumber, pageSize, sortBy, sortDirection} = getPaginationValues(req.query)

        const getCommentsForPost: QueryPaginationType<CommentsViewType[]> | null =
            await this.commentsQueryRepo.getCommentsForPost(req.params.postId, pageNumber, pageSize, sortBy, sortDirection)

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

        const newPost: PostsViewType | null = await this.postService.createPost(title, shortDescription, content, blogId)
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

        const postComment: CommentsViewType | null = await this.commentService.createPostComment(postId, content, userId, userLogin)

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

        const updatePost: boolean = await this.postService.updatePost(req.params.id, title, shortDescription, content, blogId)

        if (!updatePost) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }

    async updatePostLikeStatus (req: Request, res: Response) {

        const likeStatus = req.body.likeStatus;
        const postId = req.params.id
        const userId = req.context.user!._id.toString()

        const updateLikeStatus: boolean = await this.postService.updatePostLikeStatus(postId, userId, likeStatus)

        if (!updateLikeStatus) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }

    async deletePost(req: Request, res: Response) {

        const deletePost: boolean = await this.postService.deletePostById(req.params.id)

        if (!deletePost) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }
}

const postController = new PostController()

postRoutes.get('/', postController.getPosts.bind(postController))

postRoutes.get('/:id', postController.getPostById.bind(postController))


postRoutes.get('/:postId/comments', postController.getCommentByPostId.bind(postController))

postRoutes.post('/', baseAuthorizationMiddleware, createPostValidation,
    postController.createPost.bind(postController))

postRoutes.post('/:postId/comments', checkUserByAccessTokenMiddleware, postCommentContentValidation, inputValidationErrorsMiddleware,
    postController.createCommentByPostId.bind(postController))


postRoutes.put('/:id', baseAuthorizationMiddleware, createPostValidation,
    postController.updatePost.bind(postController))

postRoutes.put('/:id/like-status', checkUserByAccessTokenMiddleware, likeValidation,inputValidationErrorsMiddleware,
    postController.updatePostLikeStatus.bind(postController))

postRoutes.delete('/:id', baseAuthorizationMiddleware, postController.deletePost.bind(postController))
