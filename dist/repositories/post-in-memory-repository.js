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
exports.posts = [];
exports.postRepository = {
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = new Date();
            const creatingPost = {
                id: newId.toISOString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: newId.toString()
            };
            exports.posts.push(creatingPost);
            return creatingPost;
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.posts.find(p => p.id === id);
        });
    },
    updatePost(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateById = exports.posts.find(p => p.id === id);
            if (updateById) {
                updateById.title = title;
                updateById.shortDescription = shortDescription;
                updateById.content = content;
                updateById.blogId = blogId;
                return true;
            }
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteById = exports.posts.find(p => p.id === id);
            if (deleteById) {
                exports.posts.splice(exports.posts.indexOf(deleteById), 1);
                return true;
            }
        });
    }
};
