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
const db_1 = require("./db");
exports.blogs = [];
exports.blogRepository = {
    createBlog(name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newId = new Date();
            const newBlog = {
                id: newId.toISOString(),
                name: name,
                description: description,
                websiteUrl: websiteUrl
            };
            const result = yield db_1.client.db('blogPost').collection('blogs').insertOne(newBlog);
            return newBlog;
        });
    },
    getBlog() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.client.db('blogPost').collection('blogs').find({}).toArray();
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.client.db('blogPost').collection("blogs").find({ id: id }).toArray();
            //blogs.find(p => p.id === id)
        });
    },
    updateBlog(id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateById = yield db_1.client.db('blogPost').collection("blogs").find({ id: id }).toArray();
            console.log(updateById);
            // if (updateById){
            //     updateById.name = name
            //     updateById.description = description
            //     updateById.websiteUrl = websiteUrl
            //     return true
            // }
        });
    },
    deleteBlogById(id) {
        const deleteById = exports.blogs.find(p => p.id === id);
        if (deleteById) {
            exports.blogs.splice(exports.blogs.indexOf(deleteById), 1);
            return true;
        }
    }
};
