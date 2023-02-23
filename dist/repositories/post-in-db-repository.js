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
exports.postRepository = exports.posts = void 0;
const db_1 = require("./db");
exports.posts = [];
exports.postRepository = {
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = new Date();
            const newPost = {
                id: newId.toISOString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: newId.toString()
            };
            yield db_1.client.db("blogPost").collection("posts").insertOne(newPost);
            return newPost;
        });
    },
    getPost() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.client.db("blogPost").collection("posts").find({}).toArray();
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.client.db("blogPost").collection("posts").find({ id: id }).toArray();
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateById = {
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId
            };
            yield db_1.client.db("blogPost").collection("posts").updateOne({ id: id }, { $set: { title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId } });
            return true;
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.client.db("blogPost").collection("posts").deleteOne({ id: id });
            return true;
        });
    }
};
