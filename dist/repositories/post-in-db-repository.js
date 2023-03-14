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
exports.postRepository = void 0;
const db_1 = require("../db/db");
const mongodb_1 = require("mongodb");
const post_mapping_1 = require("../mapping/post-mapping");
exports.postRepository = {
    createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.insertOne(newPost);
            return {
                id: result.insertedId.toString(),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: newPost.blogName,
                createdAt: newPost.createdAt
            };
        });
    },
    createPostForBlog(createPostForBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.insertOne(createPostForBlog);
            return {
                id: result.insertedId.toString(),
                title: createPostForBlog.title,
                shortDescription: createPostForBlog.shortDescription,
                content: createPostForBlog.content,
                blogId: createPostForBlog.blogId,
                blogName: createPostForBlog.blogName,
                createdAt: createPostForBlog.createdAt
            };
        });
    },
    getPost() {
        return __awaiter(this, void 0, void 0, function* () {
            const getPosts = yield db_1.postsCollection.find({}).toArray();
            return (0, post_mapping_1.postMapping)(getPosts);
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postById = yield db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (postById) {
                return {
                    id: postById._id.toString(),
                    title: postById.title,
                    shortDescription: postById.shortDescription,
                    content: postById.content,
                    blogId: postById.blogId,
                    blogName: postById.blogName,
                    createdAt: postById.createdAt
                };
            }
            else {
                return false;
            }
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { title: title,
                        shortDescription: shortDescription,
                        content: content,
                        blogId: blogId } });
                return result.matchedCount === 1;
            }
            catch (e) {
                return false;
            }
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
                return result.deletedCount === 1;
            }
            catch (e) {
                return false;
            }
        });
    }
};
//# sourceMappingURL=post-in-db-repository.js.map