"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoute = void 0;
const express_1 = require("express");
const post_in_memory_repository_1 = require("../repositories/post-in-memory-repository");
const blog_in_memory_repository_1 = require("../repositories/blog-in-memory-repository");
exports.deleteRoute = (0, express_1.Router)({});
exports.deleteRoute.delete('/', (req, res) => {
    post_in_memory_repository_1.posts.length = 0;
    blog_in_memory_repository_1.blogs.length = 0;
    res.send(204);
});
