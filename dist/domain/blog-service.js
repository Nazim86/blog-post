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
exports.blogService = void 0;
const mongodb_1 = require("mongodb");
const blog_in_db_repository_1 = require("../repositories/blog-in-db-repository");
exports.blogService = {
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                _id: new mongodb_1.ObjectId(),
                name: name,
                description: description,
                websiteUrl: websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            const result = yield blog_in_db_repository_1.blogRepository.createBlog(newBlog);
            return result;
        });
    },
    getBlog() {
        return __awaiter(this, void 0, void 0, function* () {
            const getBlog = yield blog_in_db_repository_1.blogRepository.getBlog();
            return getBlog;
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlog = yield blog_in_db_repository_1.blogRepository.getBlogById(id);
            return foundBlog;
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blog_in_db_repository_1.blogRepository.updateBlog(id, name, description, websiteUrl);
            return result;
        });
    },
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blog_in_db_repository_1.blogRepository.deleteBlogById(id);
            return result;
        });
    }
};
//# sourceMappingURL=blog-service.js.map