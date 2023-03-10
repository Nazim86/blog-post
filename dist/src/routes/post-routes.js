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
exports.postRoutes = void 0;
const express_1 = require("express");
const base_auth_middlewares_1 = require("../middlewares/base-auth-middlewares");
const input_validation_errors_middleware_1 = require("../middlewares/input-validation-errors-middleware");
const post_validations_1 = require("../validations/post-validations");
const posts_service_1 = require("../domain/posts-service");
const pagination_values_1 = require("../functions/pagination-values");
const posts_query_repo_1 = require("../query-repositories/posts-query-repo");
exports.postRoutes = (0, express_1.Router)({});
const createPostValidation = [post_validations_1.postNameValidation, post_validations_1.descriptionValidation, post_validations_1.contentValidation, post_validations_1.blogIdValidation, input_validation_errors_middleware_1.inputValidationErrorsMiddleware]; //
exports.postRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageNumber, pageSize, sortBy, sortDirection } = (0, pagination_values_1.getPaginationValues)(req.query);
    const getPost = yield posts_query_repo_1.postQueryRepo.getPost(pageNumber, pageSize, sortBy, sortDirection);
    res.status(200).send(getPost);
}));
exports.postRoutes.post('/', base_auth_middlewares_1.baseAuthorizationMiddleware, createPostValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const newPost = yield posts_service_1.postService.createPost(title, shortDescription, content, blogId);
    if (newPost) {
        res.status(201).send(newPost);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.postRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getPost = yield posts_query_repo_1.postQueryRepo.getPostById(req.params.id);
    if (getPost) {
        res.status(200).send(getPost);
    }
    else {
        res.send(404);
    }
}));
exports.postRoutes.put('/:id', base_auth_middlewares_1.baseAuthorizationMiddleware, createPostValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const updatePost = yield posts_service_1.postService.updatePost(req.params.id, title, shortDescription, content, blogId);
    if (updatePost) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.postRoutes.delete('/:id', base_auth_middlewares_1.baseAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletePost = yield posts_service_1.postService.deletePostById(req.params.id);
    if (deletePost) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
