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
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = new Date();
            const newPost = {
                _id: new mongodb_1.ObjectId(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: newId.toString()
            };
            const result = yield db_1.postsCollection.insertOne(newPost);
            return {
                id: result.insertedId.toString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: newId.toString()
            };
        });
    },
    getPost() {
        return __awaiter(this, void 0, void 0, function* () {
            const getposts = yield db_1.postsCollection.find({}).toArray();
            return (0, post_mapping_1.postMapping)(getposts);
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postById = yield db_1.postsCollection.findOne({ _id: id });
            if (postById) {
                return {
                    id: postById._id.toString(),
                    title: postById.title,
                    shortDescription: postById.shortDescription,
                    content: postById.content,
                    blogId: postById.blogId,
                    blogName: postById.blogName
                };
            }
            else {
                return false;
            }
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.updateOne({ _id: id }, { $set: { title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId } });
            return result.matchedCount === 1;
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.deleteOne({ _id: id });
            return result.deletedCount === 1;
        });
    }
};
