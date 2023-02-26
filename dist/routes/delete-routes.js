"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoute = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.deleteRoute = (0, express_1.Router)({});
exports.deleteRoute.delete('/', (req, res) => {
    db_1.blogsCollection.deleteMany({});
    db_1.postsCollection.deleteMany({});
    return res.sendStatus(204);
});
