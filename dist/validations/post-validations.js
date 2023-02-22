"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogIdValidation = exports.contentValidation = exports.descriptionValidation = exports.postNameValidation = void 0;
const express_validator_1 = require("express-validator");
const blog_in_memory_repository_1 = require("../repositories/blog-in-memory-repository");
exports.postNameValidation = (0, express_validator_1.body)("title").isString().trim().notEmpty().isLength({ max: 30 });
exports.descriptionValidation = (0, express_validator_1.body)("shortDescription").isString().trim().notEmpty().isLength({ max: 100 });
exports.contentValidation = (0, express_validator_1.body)("content").isString().trim().notEmpty().isLength({ max: 1000 });
exports.blogIdValidation = (0, express_validator_1.body)("blogId").isString().trim().notEmpty().custom(value => {
    const blog = blog_in_memory_repository_1.blogs.find(b => b.id === value);
    if (!blog)
        throw new Error();
    return true;
});
