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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blog_routes_1 = require("./routes/blog-routes");
const post_routes_1 = require("./routes/post-routes");
const db_1 = require("./db/db");
const delete_routes_1 = require("./routes/delete-routes");
const user_router_1 = require("./routes/user-router");
const auth_routes_1 = require("./routes/auth-routes");
const comment_router_1 = require("./routes/comment-router");
exports.app = (0, express_1.default)();
// const parserMiddleware = bodyParser({})
// app.use(parserMiddleware)
exports.app.use(express_1.default.json());
const port = process.env.PORT || 5000;
exports.app.use("/blogs", blog_routes_1.blogRoutes);
exports.app.use("/posts", post_routes_1.postRoutes);
exports.app.use("/testing/all-data", delete_routes_1.deleteRoute);
exports.app.use("/users", user_router_1.userRouter);
exports.app.use("/auth", auth_routes_1.authRoutes);
exports.app.use("/comments", comment_router_1.commentRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    exports.app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
//# sourceMappingURL=index.js.map