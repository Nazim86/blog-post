import {BlogQueryRepo} from "./query-repositories/blog-query-repo";
import {JwtService} from "./domain/jwt-service";
import {BlogService} from "./domain/blog-service";
import {PostsQueryRepo} from "./query-repositories/posts-query-repo";
import {PostService} from "./domain/post-service";
import {BlogRepository} from "./repositories/blog-in-db-repository";
import {PostRepository} from "./repositories/post-in-db-repository";
import {BlogController} from "./controllers/blog-controller";
import {CommentService} from "./domain/comment-service";
import {CommentsQueryRepo} from "./query-repositories/comments-query-repo";
import {CommentDbRepository} from "./repositories/comment-db-repository";
import {PostController} from "./controllers/post-controller";
import {CommentController} from "./controllers/comment-controller";
import {AuthService} from "./domain/auth-service";
import {UserService} from "./domain/user-service";
import {UserRepository} from "./repositories/user-in-db-repository";
import {UserQueryRepo} from "./query-repositories/user-query-repo";
import {UserController} from "./controllers/user-controller";

const jwtService = new JwtService()

const commentsQueryRepo = new CommentsQueryRepo()
const commentRepository = new CommentDbRepository()
const postQueryRepo = new PostsQueryRepo()

const commentService = new CommentService(commentsQueryRepo,postQueryRepo,commentRepository)

const blogQueryRepo = new BlogQueryRepo()
const blogRepository = new BlogRepository()
const blogService = new BlogService(blogRepository)

const postRepository = new PostRepository()
const postService = new PostService(postRepository)

const userRepository = new UserRepository()
const userQueryRepo = new UserQueryRepo()
const userService = new UserService(userRepository)

const authService = new AuthService()


export const blogController = new BlogController(blogQueryRepo,
    jwtService, blogService, postQueryRepo, postService)


export const postController = new PostController(postQueryRepo,commentsQueryRepo,postService,commentService,jwtService)

export const commentController = new CommentController(commentService,commentsQueryRepo,jwtService)

export const userController = new UserController(userQueryRepo,userService)