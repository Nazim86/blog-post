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
exports.deleteRoute = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.deleteRoute = (0, express_1.Router)({});
exports.deleteRoute.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.blogsCollection.deleteMany({});
    yield db_1.postsCollection.deleteMany({});
    yield db_1.usersCollection.deleteMany({});
    yield db_1.commentsCollection.deleteMany({});
    return res.sendStatus(204);
}));
//# sourceMappingURL=delete-routes.js.map