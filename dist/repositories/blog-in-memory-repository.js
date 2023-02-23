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
exports.blogRepository = exports.blogs = void 0;
exports.blogs = [];
exports.blogRepository = {
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = new Date();
            const creatingBlog = {
                id: newId.toISOString(),
                name: name,
                description: description,
                websiteUrl: websiteUrl
            };
            exports.blogs.push(creatingBlog);
            return creatingBlog;
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.blogs.find(p => p.id === id);
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateById = exports.blogs.find(p => p.id === id);
            if (updateById) {
                updateById.name = name;
                updateById.description = description;
                updateById.websiteUrl = websiteUrl;
                return true;
            }
        });
    },
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteById = exports.blogs.find(p => p.id === id);
            if (deleteById) {
                exports.blogs.splice(exports.blogs.indexOf(deleteById), 1);
                return true;
            }
        });
    }
};
