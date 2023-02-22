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
const blog_in_db_repository_1 = require("../repositories/blog-in-db-repository");
const base_auth_middlewares_1 = require("../middlewares/base-auth-middlewares");
const input_validation_middleware_1 = require("../middlewares/input-validation-middleware");
const blog_validations_1 = require("../validations/blog-validations");
exports.blogRoutes = (0, express_1.Router)({});
const createPostValidations = [blog_validations_1.nameValidation, blog_validations_1.description, blog_validations_1.websiteUrl, input_validation_middleware_1.inputValidationMiddleware];
exports.blogRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getBlog = yield blog_in_db_repository_1.blogRepository.getBlog();
    res.status(200).send(getBlog);
}));
exports.blogRoutes.post('/', base_auth_middlewares_1.baseAuthorizationMiddleware, createPostValidations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const username = req.headers.username
    const name = req.body.name;
    const description = req.body.description;
    const websiteUrl = req.body.websiteUrl;
    const newBlog = yield blog_in_db_repository_1.blogRepository.createBlog(name, description, websiteUrl);
    if (newBlog) {
        res.status(201).send(newBlog);
    }
}));
exports.blogRoutes.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getBlog = yield blog_in_db_repository_1.blogRepository.getBlogById(req.params.id);
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
    const updateBlog = yield blog_in_db_repository_1.blogRepository.updateBlog(req.params.id, name, description, websiteUrl);
    if (updateBlog) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.blogRoutes.delete('/:id', base_auth_middlewares_1.baseAuthorizationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBlog = yield blog_in_db_repository_1.blogRepository.deleteBlogById(req.params.id);
    if (deleteBlog) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
