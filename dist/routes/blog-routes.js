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
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const blog_validations_1 = require("../validations/blog-validations");
const mongodb_1 = require("mongodb");
const blogs_service_1 = require("../domain/blogs-service");
const blog_query_repo_1 = require("../query-repositories/blog-query-repo");
const posts_query_repository_1 = require("../query-repositories/posts-query-repository");
exports.blogRoutes = (0, express_1.Router)({});
const createPostValidations = [blog_validations_1.nameValidation, blog_validations_1.description, blog_validations_1.websiteUrl, input_validation_middleware_1.inputValidationMiddleware];
const blogQueryValidations = [blog_validations_1.searchNameValidation, blog_validations_1.sortByValidation, blog_validations_1.sortDirectionValidation, blog_validations_1.pageSizeValidation, blog_validations_1.pageNumberValidation];
const getPaginationValues = (query) => {
    var _a, _b, _c;
    return {
        searchName: (_a = query.searchName) !== null && _a !== void 0 ? _a : '',
        sortBy: (_b = query.sortBy) !== null && _b !== void 0 ? _b : 'createdAt',
        sortDirection: (_c = query.sortDirection) !== null && _c !== void 0 ? _c : 'desc',
        pageNumber: isNaN(+query.pageNumber) ? 1 : +query.pageNumber,
        pageSize: isNaN(+query.pageSize) ? 10 : +query.pageSize,
    };
}; // need more explanation
exports.blogRoutes.get('/', blogQueryValidations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const searchName = req.query.searchName | undefined | null
    // const sortBy = req.query.sortBy
    // const sortDirection = req.query.sortDirection
    // const pageNumber = req.query.pageNumber
    // const pageSize = req.query.pageSize
    const { searchName, sortBy, sortDirection, pageNumber, pageSize } = getPaginationValues(req.query);
    console.log(pageSize);
    const getBlog = yield blog_query_repo_1.blogQueryRepo.getBlog(searchName, sortBy, sortDirection, pageNumber, pageSize);
    res.status(200).send(getBlog);
}));
exports.blogRoutes.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNumber, pageSize, sortBy, sortDirection } = getPaginationValues(req.query);
    const blogId = req.body.blogId;
    const getBlogByBlogId = yield posts_query_repository_1.postQueryRepo.getPostsByBlogId(pageNumber, pageSize, sortBy, sortDirection, blogId);
    //----------------------------------------------------------------------------------
    const getBlog = yield blogs_service_1.blogsService.getBlogById(new mongodb_1.ObjectId(req.params.id));
    if (getBlog) {
        res.status(200).send(getBlog);
    }
    else {
        res.send(404);
    }
}));
exports.blogRoutes.post('/', base_auth_middlewares_1.baseAuthorizationMiddleware, createPostValidations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const username = req.headers.username
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;
    const newBlog = yield blogs_service_1.blogsService.createBlog(name, description, websiteUrl);
    if (newBlog) {
        res.status(201).send(newBlog);
    }
}));
exports.blogRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getBlog = yield blogs_service_1.blogsService.getBlogById(new mongodb_1.ObjectId(req.params.id));
    if (getBlog) {
        res.status(200).send(getBlog);
    }
    else {
        res.send(404);
    }
}));
exports.blogRoutes.put('/:id', base_auth_middlewares_1.baseAuthorizationMiddleware, createPostValidations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;
    const updateBlog = yield blogs_service_1.blogsService.updateBlog(new mongodb_1.ObjectId(req.params.id), name, description, websiteUrl);
    if (updateBlog) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.blogRoutes.delete('/:id', base_auth_middlewares_1.baseAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBlog = yield blogs_service_1.blogsService.deleteBlogById(new mongodb_1.ObjectId(req.params.id));
    if (deleteBlog) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
