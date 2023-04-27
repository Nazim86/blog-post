import {BlogQueryRepo} from "./query-repositories/blog-query-repo";
import {JwtService} from "./domain/jwt-service";
import {BlogService} from "./domain/blog-service";
import {PostsQueryRepo} from "./query-repositories/posts-query-repo";
import {PostsService} from "./domain/posts-service";
import {BlogRepository} from "./repositories/blog-in-db-repository";
import {PostRepository} from "./repositories/post-in-db-repository";
import {BlogController} from "./controllers/blog-controller";


const blogQueryRepo = new BlogQueryRepo()

const jwtService = new JwtService()

const blogRepository = new BlogRepository()

const blogService = new BlogService(blogRepository)

const postQueryRepo = new PostsQueryRepo()

const postRepository = new PostRepository()

const postService = new PostsService(postRepository)

export const blogController = new BlogController(blogQueryRepo,
    jwtService, blogService, postQueryRepo, postService)
