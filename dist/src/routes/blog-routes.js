"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = require("express");
const base_auth_middlewares_1 = require("../middlewares/base-auth-middlewares");
const input_validation_errors_middleware_1 = require("../middlewares/input-validation-errors-middleware");
const blog_validations_1 = require("../validations/blog-validations");
const blog_service_1 = require("../domain/blog-service");
const blog_query_repo_1 = require("../query-repositories/blog-query-repo");
const pagination_values_1 = require("../functions/pagination-values");
const posts_query_repo_1 = require("../query-repositories/posts-query-repo");
const posts_service_1 = require("../domain/posts-service");
exports.blogRoutes = (0, express_1.Router)({});
const createPostValidations = [blog_validations_1.nameValidation, blog_validations_1.description, blog_validations_1.websiteUrl, input_validation_errors_middleware_1.inputValidationErrorsMiddleware];
exports.blogRoutes.get('/', blog_validations_1.queryValidations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const searchName = req.query.searchName | undefined | null
    // const sortBy = req.query.sortBy
    // const sortDirection = req.query.sortDirection
    // const pageNumber = req.query.pageNumber
    // const pageSize = req.query.pageSize
    const { searchName, sortBy, sortDirection, pageNumber, pageSize } = (0, pagination_values_1.getPaginationValues)(req.query);
    const getBlog = yield blog_query_repo_1.blogQueryRepo.getBlog(searchName, sortBy, sortDirection, pageNumber, pageSize);
    res.status(200).send(getBlog);
}));
exports.blogRoutes.get('/:blogId/posts', blog_validations_1.queryValidations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNumber, pageSize, sortBy, sortDirection } = (0, pagination_values_1.getPaginationValues)(req.query);
    const blogId = req.params.blogId;
    const getBlogByBlogId = yield posts_query_repo_1.postQueryRepo.getPostsByBlogId(pageNumber, pageSize, sortBy, sortDirection, blogId);
    if (getBlogByBlogId) {
        res.status(200).send(getBlogByBlogId);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogRoutes.post('/', base_auth_middlewares_1.baseAuthorizationMiddleware, createPostValidations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;
    const newBlog = yield blog_service_1.blogService.createBlog(name, description, websiteUrl);
    if (newBlog) {
        res.status(201).send(newBlog);
    }
}));
exports.blogRoutes.post('/:blogId/posts', base_auth_middlewares_1.baseAuthorizationMiddleware, blog_validations_1.postForBlogValidations, input_validation_errors_middleware_1.inputValidationErrorsMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.params.blogId;
    const newPostForBlog = yield posts_service_1.postService.createPostForBlog(title, shortDescription, content, blogId);
    if (newPostForBlog) {
        res.status(201).send(newPostForBlog);
    }
    else {
        return res.sendStatus(404);
    }
}));
exports.blogRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getBlog = yield blog_query_repo_1.blogQueryRepo.getBlogById(req.params.id);
    if (getBlog) {
        res.status(200).send(getBlog);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogRoutes.put('/:id', base_auth_middlewares_1.baseAuthorizationMiddleware, createPostValidations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;
    const updateBlog = yield blog_service_1.blogService.updateBlog(req.params.id, name, description, websiteUrl);
    if (updateBlog) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.blogRoutes.delete('/:id', base_auth_middlewares_1.baseAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBlog = yield blog_service_1.blogService.deleteBlogById(req.params.id);
    if (deleteBlog) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
