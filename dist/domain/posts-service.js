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
exports.postService = void 0;
const mongodb_1 = require("mongodb");
const post_in_db_repository_1 = require("../repositories/post-in-db-repository");
exports.postService = {
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = new Date();
            const newPost = {
                _id: new mongodb_1.ObjectId(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: newId.toString(),
                createdAt: new Date().toISOString()
            };
            const result = yield post_in_db_repository_1.postRepository.createPost(newPost);
            return result;
        });
    },
    createPostForBlog(title, shortDescription, content, blogId, blogName) {
        return __awaiter(this, void 0, void 0, function* () {
            const createPostForBlog = {
                _id: new mongodb_1.ObjectId(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: blogName,
                createdAt: new Date().toISOString()
            };
            const result = yield post_in_db_repository_1.postRepository.createPostForBlog(createPostForBlog);
            return result;
        });
    },
    getPost() {
        return __awaiter(this, void 0, void 0, function* () {
            const getposts = yield post_in_db_repository_1.postRepository.getPost();
            return getposts;
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postById = yield post_in_db_repository_1.postRepository.getPostById(id);
            return postById;
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield post_in_db_repository_1.postRepository.updatePost(id, title, shortDescription, content, blogId);
            return result;
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = post_in_db_repository_1.postRepository.deletePostById(id);
            return result;
        });
    }
};
