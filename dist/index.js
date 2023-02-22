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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blog_routes_1 = require("./routes/blog-routes");
const post_routes_1 = require("./routes/post-routes");
const post_in_memory_repository_1 = require("./repositories/post-in-memory-repository");
const blog_in_memory_repository_1 = require("./repositories/blog-in-memory-repository");
const db_1 = require("./repositories/db");
// import {deleteRoute} from "./routes/delete-routes";
const app = (0, express_1.default)();
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
const port = process.env.PORT || 5000;
app.use("/blogs", blog_routes_1.blogRoutes);
app.use("/posts", post_routes_1.postRoutes);
app.delete('/testing/all-data', (req, res) => {
    post_in_memory_repository_1.posts.length = 0;
    blog_in_memory_repository_1.blogs.length = 0;
    return res.sendStatus(204);
});
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
