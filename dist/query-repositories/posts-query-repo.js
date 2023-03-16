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
exports.postQueryRepo = void 0;
const db_1 = require("../db/db");
const post_mapping_1 = require("../mapping/post-mapping");
const mongodb_1 = require("mongodb");
exports.postQueryRepo = {
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
            }
            catch (e) {
                return false;
            }
        });
    },
    getPost(pageNumber, pageSize, sortBy, sortDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = (pageNumber - 1) * pageSize;
            const totalCount = yield db_1.postsCollection.countDocuments({});
            const pagesCount = Math.ceil(totalCount / pageSize);
            const getposts = yield db_1.postsCollection.find({})
                .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
                .skip(skipSize)
                .limit(pageSize)
                .toArray();
            const mappedPost = (0, post_mapping_1.postMapping)(getposts);
            return {
                pagesCount: pagesCount,
                page: pageNumber,
                pageSize: pageSize,
                totalCount: totalCount,
                items: mappedPost
            };
        });
    },
    getPostsByBlogId(pageNumber, pageSize, sortBy, sortDirection, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = (pageNumber - 1) * pageSize;
            const totalCount = yield db_1.postsCollection.countDocuments({ blogId: blogId });
            const pagesCount = Math.ceil(totalCount / pageSize);
            const getPostsByBlogId = yield db_1.postsCollection.find({ blogId: blogId })
                .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
                .skip(skipSize)
                .limit(pageSize)
                .toArray();
            if (getPostsByBlogId.length === 0)
                return false;
            const mappedBlog = (0, post_mapping_1.postMapping)(getPostsByBlogId);
            return {
                pagesCount: pagesCount,
                page: pageNumber,
                pageSize: pageSize,
                totalCount: totalCount,
                items: mappedBlog
            };
        });
    }
};
//# sourceMappingURL=posts-query-repo.js.map