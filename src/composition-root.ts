import "reflect-metadata"
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
import {EmailManager} from "./managers/email-manager";
import {EmailAdapter} from "./adapters/email-adapter";
import {TokenInDbRepository} from "./repositories/token-in-db-repository";
import {SecurityService} from "./domain/security-service";
import {AuthController} from "./controllers/auth-controller";
import {SecurityController} from "./controllers/security-controller";
import {DeleteController} from "./controllers/delete-controller";
import {Container} from "inversify";

// const jwtService = new JwtService()
//
// const commentsQueryRepo = new CommentsQueryRepo()
// const commentRepository = new CommentDbRepository()
// const postQueryRepo = new PostsQueryRepo()
//
// const commentService = new CommentService(commentsQueryRepo,postQueryRepo,commentRepository)
//
// const blogQueryRepo = new BlogQueryRepo()
// const blogRepository = new BlogRepository()
// const blogService = new BlogService(blogRepository)
//
// const postRepository = new PostRepository()
// const postService = new PostService(postRepository)
//
// const userRepository = new UserRepository()
// const userQueryRepo = new UserQueryRepo()
// const userService = new UserService(userRepository)
//
// const tokenInDbRepository = new TokenInDbRepository()
//
// const emailAdapter = new EmailAdapter()
// const emailManager = new EmailManager(emailAdapter)
//
// const securityService = new SecurityService(jwtService,tokenInDbRepository)
//
// export const authService = new AuthService(userRepository,jwtService,emailManager,tokenInDbRepository)
//
// export const blogController = new BlogController(blogQueryRepo,
//     jwtService, blogService, postQueryRepo, postService)
//
// export const postController = new PostController(postQueryRepo,commentsQueryRepo,postService,commentService,jwtService)
//
// export const commentController = new CommentController(commentService,commentsQueryRepo,jwtService)
//
// export const userController = new UserController(userQueryRepo,userService)
//
// export const authController = new AuthController(jwtService,authService,securityService,userRepository)
//
// export const securityController = new SecurityController (jwtService,securityService)
//
// export const deleteController = new DeleteController()


export const container = new Container()

container.bind(BlogController).to(BlogController)
container.bind(BlogService).toSelf()
container.bind(BlogRepository).toSelf()
container.bind(BlogQueryRepo).toSelf()
container.bind(JwtService).toSelf()
container.bind(PostController).toSelf()
container.bind(PostService).toSelf()
container.bind(PostsQueryRepo).toSelf()
container.bind(PostRepository).toSelf()
container.bind(AuthService).toSelf()
container.bind(AuthController).toSelf()
container.bind(TokenInDbRepository).toSelf()
container.bind(UserController).toSelf()
container.bind(UserService).toSelf()
container.bind(UserRepository).toSelf()
container.bind(UserQueryRepo).toSelf()
container.bind(CommentController).toSelf()
container.bind(CommentService).toSelf()
container.bind(CommentDbRepository).toSelf()
container.bind(CommentsQueryRepo).toSelf()

container.bind(EmailAdapter).toSelf()
container.bind(EmailManager).toSelf()
container.bind(DeleteController).toSelf()
container.bind(SecurityController).toSelf()
container.bind(SecurityService).toSelf()

























