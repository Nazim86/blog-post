"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = require("express");
const post_in_memory_repository_1 = require("../repositories/post-in-memory-repository");
const base_auth_middlewares_1 = require("../middlewares/base-auth-middlewares");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const post_validations_1 = require("../validations/post-validations");
exports.postRoutes = (0, express_1.Router)({});
const createPostValidation = [post_validations_1.postNameValidation, post_validations_1.descriptionValidation, post_validations_1.contentValidation, post_validations_1.blogIdValidation, input_validation_middleware_1.inputValidationMiddleware]; //
exports.postRoutes.get('/', (req, res) => {
    res.status(200).send(post_in_memory_repository_1.posts);
});
exports.postRoutes.post('/', base_auth_middlewares_1.baseAuthorizationMiddleware, createPostValidation, (req, res) => {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const newPost = post_in_memory_repository_1.postRepository.createPost(title, shortDescription, content, blogId);
    if (newPost) {
        res.status(201).send(newPost);
    }
});
exports.postRoutes.get('/:id', (req, res) => {
    const getPost = post_in_memory_repository_1.postRepository.getPostById(req.params.id);
    if (getPost) {
        res.status(200).send(getPost);
    }
    else {
        res.send(404);
    }
    res.status(200).send(getPost);
});
exports.postRoutes.put('/:id', base_auth_middlewares_1.baseAuthorizationMiddleware, createPostValidation, (req, res) => {
    const title = req.body.title;
    const shortDescription = req.body.shortDescription;
    const content = req.body.content;
    const blogId = req.body.blogId;
    const updatePost = post_in_memory_repository_1.postRepository.updatePost(req.params.id, title, shortDescription, content, blogId);
    if (updatePost) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
exports.postRoutes.delete('/:id', base_auth_middlewares_1.baseAuthorizationMiddleware, (req, res) => {
    const deletePost = post_in_memory_repository_1.postRepository.deletePostById(req.params.id);
    if (deletePost) {
        res.send(204);
    }
    else {
        res.send(404);
    }
});
